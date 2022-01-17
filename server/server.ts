import express from 'express'
import jwt from 'jsonwebtoken'
import tokenKEY from './mongoDB/auth/tokenKEY'
import cors from 'cors'
import { Server } from "socket.io";
import { createClient } from 'redis';
import logger from './utils/logger'
import verifyToken from './mongoDB/auth/verifyToken'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import connect from './utils/connect'
import routes from './utils/routes'

const port = config.get<number>('PORT');
const appVersion = 1

const app = express();
app.use(cors());
app.use(express.json());

const redis: any = createClient();
(async () => await redis.connect().then(() => logger.info("Connection with Redis has been made!")))();

const server = app.listen(port, async () => {
    logger.info(`Listening on port ${port} (http://localhost:${port})`);

    await connect();

    routes(app);
});
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


// // ----- ----- ROUTES ----- -----
import login from './mongoDB/auth/login'
app.post('/auth/login', (req, res) => login(req, res));

// app.post('/find/:where', (req, res) => require(`./mongoDB/find/${req.params.where}`)(req, res)); // Need function to cache find things etc.

// app.post('/guest/:where', async (req, res) => {
//     const loadUserByLogin = require('./mongoDB/load/loadUserByLogin')
//     req.body.user = await loadUserByLogin(req.body.login)
//     if (!req.body.user) {
//         return res.status(404).send({ error: 'Not found' })
//     }
//     if (parseInt(req.body.user.public_profile) == 0) {
//         return res.status(403).send({ user: req.body.user })
//     }
//     await require(`./mongoDB/find/${req.params.where}`)(req)
//         .then((data) => {
//             return res.send({
//                 user: req.body.user,
//                 data
//             })
//         })
// });

// app.post('/delete', async (req, res) => {
//     await verifyToken(req, res)
//     logger.info('After verifyToken')
//     await require(`./mongoDB/delete`)(req)
//         .then(async () => await handleSynchronization(req, res, req.body.array, 'delete'))
//         .catch(err => {
//             logger.info(err)
//             res.status(404).send({ error: 'Wrong query' })
//         })
// })

// app.post('/:what/:where', async (req, res) => {
//     await verifyToken(req, res)
//     logger.info('After verifyToken')
//     await require(`./mongoDB/${req.params.what}/${req.params.where}`)(req, res)
//         .then(async data => await handleSynchronization(req, res, data, 'change'))
//         .catch(err => {
//             logger.info(err)
//             res.status(404).send({ error: 'Wrong query' })
//         })
// });


// // ---- ---- SOCKET ---- ----


io.on('connection', async (socket) => {
    const refresh_token: any = socket.handshake.query.refresh_token
    if (refresh_token) {
        jwt.verify(refresh_token, tokenKEY, async (err: any, user: any) => {
            if (user) {
                logger.info(`User ${user._id} connected to the socket`)
                socket.join(user._id)
                io.to(socket.id).emit('compareDatabases', {
                    "lastUpdated": JSON.parse(await redis.get(user._id)) || await createSynchronizationObject(user._id),
                    "version": appVersion,
                    "socket_ID": socket.id
                })
            } else {
                // If refresh_token is dead, logout user, but allow synchronization | Does it really gona work? Check token while synchro won't kill connection...?
                io.to(socket.id).emit('compareDatabases', {
                    "lastUpdated": { ...await synchronizationObject(0), ...{ logout: new Date().getTime() + 999999999 } },
                    "version": appVersion,
                    "socket_ID": socket.id
                })
            }
        })
    }
});

const handleSynchronization = async (req: any, res: any, data: any, whatToDo: string) => {
    if (req.params.where == 'create' || req.params.where == 'analyze') { // Overwritting coach's routes
        req.params.where = 'settings'
    }
    await updateSynchronizationObject(req.body.user_ID, req.params.where)
    io.to(req.body.user_ID).except(req.body.socket_ID).emit('synchronizationMessege', {
        where: req.params.where,
        whatToDo: whatToDo,
        array: data,
        socket_ID: req.body.socket_ID
    })
    return res.send({ data, token: req.body.token, refresh_token: req.body.refresh_token })
}

const createSynchronizationObject = async (user_ID: string) => {
    logger.info(`Creating Synchronization Object for ${user_ID}`)
    await redis.set(user_ID, JSON.stringify(await synchronizationObject()))
    return JSON.parse(await redis.get(user_ID))
}

const synchronizationObject = async (timeMS = new Date().getTime()) => {
    return {
        product: timeMS,
        exercise: timeMS,
        workout_plan: timeMS,
        settings: timeMS,
        daily_measurement: timeMS,
        logout: 0
    }
}

const updateSynchronizationObject = async (user_ID: string, where: string) => {
    logger.info(`Updating Synchronization Object (${where}) for ${user_ID}`)
    let object = JSON.parse(await redis.get(user_ID))
    object[where] = new Date().getTime();
    await redis.set(user_ID, JSON.stringify(object))
    return object
}