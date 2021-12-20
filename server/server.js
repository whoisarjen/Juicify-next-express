const express = require('express');
const jwt = require("jsonwebtoken");
const tokenKEY = require("./mongoDB/auth/tokenKEY")
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
    },
});


// ----- ----- ROUTES ----- -----


app.post('/auth/login', (req, res) => require('./mongoDB/auth/login')(req, res));

app.post('/find/product', (req, res) => require('./mongoDB/find/product')(req, res));
app.post('/find/exercise', (req, res) => require('./mongoDB/find/exercise')(req, res));

app.post('/find/daily_measurements', (req, res) => {
    req.body.user_ID = '60ba774fe0ecd72587eeaa29'
    require('./mongoDB/find/daily_measurements')(req, res)
});

app.post('/guest/daily_measurement', async (req, res) => {
    const loadUserByLogin = require('./mongoDB/functions/loadUserByLogin')
    req.body.user = await loadUserByLogin(req.body.login)
    if (!req.body.user) return res.status(404).send({ error: 'Not found' })
    if (parseInt(req.body.user.public_profile) == 0) return res.status(403).send({ user: req.body.user })
    require('./mongoDB/find/daily_measurement')(req, res)
});

// register
// remind-password
// images
// select
// Before it, need to handle every possible query without token

app.post('/delete', async (req, res) => {
    req.body.user_ID = '60ba774fe0ecd72587eeaa29' // verifi token
    await require(`./mongoDB/delete`)(req)
        .then(async () => {
            await updateSynchronizationObject(req.body.user_ID, req.body.where)
            io.to(req.body.user_ID).except(req.body.socket_ID).emit('synchronizationMessege', {
                where: req.body.where,
                whatToDo: 'delete',
                array: req.body.array
            })
            res.send({})
        })
        .catch(err => {
            console.log(err)
            res.status(404).send({ error: 'Wrong query' })
        })
})

app.post('/:what/:where', async (req, res) => {
    req.body.user_ID = '60ba774fe0ecd72587eeaa29' // verifi token
    await require(`./mongoDB/${req.params.what}/${req.params.where}`)(req)
        .then(async response => {
            await updateSynchronizationObject(req.body.user_ID, req.params.where)
            io.to(req.body.user_ID).except(req.body.socket_ID).emit('synchronizationMessege', {
                where: req.params.where,
                whatToDo: 'change',
                array: response
            })
            res.send({ data: response })
        })
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
                // Logout user bc refresh_token is dead?
                // or refresh it, but then how to handle new token?
            }
        })
    }
});

const createSynchronizationObject = async (user_ID) => {
    console.log(`Creating Update Object for ${user_ID}`)
    const timeMS = new Date().getTime()
    await redis.set(user_ID, JSON.stringify({
        product: timeMS,
        exercise: timeMS,
        workout_plan: timeMS,
        settings: timeMS,
        daily_measurement: timeMS,
        logout: 0
    }))
    return JSON.parse(await redis.get(user_ID))
}

const updateSynchronizationObject = async (user_ID, where) => {
    console.log(`Updating Update Object (${where}) for ${user_ID}`)
    let object = JSON.parse(await redis.get(user_ID))
    object[where] = new Date().getTime();
    await redis.set(user_ID, JSON.stringify(object))
    return object
}