import express from 'express'
import cors from 'cors'
import { Server } from "socket.io";
import logger from './utils/logger'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import connect from './utils/connect'
import routes from './utils/routes'
import deserializeUser from './mongoDB/middleware/deserializeUser'
import { socket } from './utils/socket';

const port = config.get<number>('PORT');

const app = express();
app.use(cors());
app.use(express.json());
app.use(deserializeUser)

const server = app.listen(port, async () => {
    logger.info(`Listening on port ${port} (http://localhost:${port})`);
    app.set('socket', io);
    await connect();
    socket({ io })
    routes(app);
});

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


// // ----- ----- ROUTES ----- -----
// import login from './mongoDB/auth/login'
// app.post('/auth/login', (req, res) => login(req, res));

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
//     await require(`./mongoDB/delete`)(req)
//         .then(async () => await handleSynchronization(req, res, req.body.array, 'delete'))
//         .catch(err => {
//             logger.info(err)
//             res.status(404).send({ error: 'Wrong query' })
//         })
// })

// app.post('/:what/:where', async (req, res) => {
//     await require(`./mongoDB/${req.params.what}/${req.params.where}`)(req, res)
//         .then(async data => await handleSynchronization(req, res, data, 'change'))
//         .catch(err => {
//             logger.info(err)
//             res.status(404).send({ error: 'Wrong query' })
//         })
// });