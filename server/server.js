const express = require('express');
const jwt = require("jsonwebtoken");
const tokenKEY = require("./mongoDB/auth/tokenKEY")
const verifyToken = require('./mongoDB/auth/verifyToken')
const app = express();
const cors = require('cors');
const port = 4000;
const appVersion = 1

require('./mongoDB/connection');

app.use(cors());
app.use(express.json());

const redisServer = require('redis');
const redis = redisServer.createClient();
(async () => await redis.connect().then(() => console.log("Connection with Redis has been made!")))();

const socket = require('socket.io');
const server = app.listen(port, () => console.log(`Listening on port ${port} (http://localhost:${port})`));
const io = socket(server, {
    cors: {
        origin: '*',
    }
});


// ----- ----- ROUTES ----- -----


app.post('/auth/login', (req, res) => require('./mongoDB/auth/login')(req, res));

app.post('/find/:where', (req, res) => require(`./mongoDB/find/${req.params.where}`)(req, res)); // Need function to cache find things etc.

app.post('/guest/:where', async (req, res) => {
    const loadUserByLogin = require('./mongoDB/functions/loadUserByLogin')
    req.body.user = await loadUserByLogin(req.body.login)
    if (!req.body.user) {
        return res.status(404).send({ error: 'Not found' })
    }
    if (parseInt(req.body.user.public_profile) == 0) {
        return res.status(403).send({ user: req.body.user })
    }
    await require(`./mongoDB/find/${req.params.where}`)(req)
        .then((data) => {
            return res.send({
                user: req.body.user,
                data
            })
        })
});

app.post('/delete', async (req, res) => {
    await verifyToken(req)
    await require(`./mongoDB/delete`)(req)
        .then(async () => await handleSynchronization(req, res, req.body.array, 'delete'))
        .catch(err => {
            console.log(err)
            res.status(404).send({ error: 'Wrong query' })
        })
})

app.post('/:what/:where', async (req, res) => {
    await verifyToken(req)
    await require(`./mongoDB/${req.params.what}/${req.params.where}`)(req, res)
        .then(async data => await handleSynchronization(req, res, data, 'change'))
        .catch(err => {
            console.log(err)
            res.status(404).send({ error: 'Wrong query' })
        })
});


// ---- ---- SOCKET ---- ----


io.on('connection', async (socket) => {
    const refresh_token = socket.handshake.query.refresh_token
    if (refresh_token) {
        jwt.verify(refresh_token, tokenKEY, async (err, user) => {
            if (user) {
                console.log(`User ${user._id} connected to the socket`)
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

const handleSynchronization = async (req, res, data, whatToDo) => {
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
    return res.send({ data })
}

const createSynchronizationObject = async (user_ID) => {
    console.log(`Creating Synchronization Object for ${user_ID}`)
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

const updateSynchronizationObject = async (user_ID, where) => {
    console.log(`Updating Synchronization Object (${where}) for ${user_ID}`)
    let object = JSON.parse(await redis.get(user_ID))
    object[where] = new Date().getTime();
    await redis.set(user_ID, JSON.stringify(object))
    return object
}