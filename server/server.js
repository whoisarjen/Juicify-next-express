const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

require('./mongoDB/connection');

app.use(cors());
app.use(express.json());

const socket = require('socket.io');
const server = app.listen(port, () =>
    console.log(`Listening on port ${port} (http://localhost:${port})`)
);

app.post('/auth/login', (req, res) => require('./mongoDB/auth/login')(req, res));

app.post('/find/product', (req, res) => require('./mongoDB/find/product')(req, res));

app.post('/guest/daily_measurement', async (req, res) => {
    const loadUserByLogin = require('./mongoDB/functions/loadUserByLogin')
    req.body.user = await loadUserByLogin(req.body.login)
    if (!req.body.user) return res.status(404).send({ error: 'Not found' })
    if (parseInt(req.body.user.public_profile) == 0) return res.status(403).send({ error: 'Account is not public' })
    require('./mongoDB/find/daily_measurement')(req, res)
});

app.post('/insert/daily_measurement', (req, res) => {
    req.body.user_ID = '60ba774fe0ecd72587eeaa29'
    require('./mongoDB/insert/daily_measurement')(req, res)
});

app.post('/update/daily_measurement', (req, res) => {
    req.body.user_ID = '60ba774fe0ecd72587eeaa29'
    require('./mongoDB/update/daily_measurement')(req, res)
});

// app.post('/:where/:what', (req, res) => {
//   try {
//     require(`./mongoDB/${req.params.where}/${req.params.what}`)(req, res)
//   } catch (err) {
//     console.log(`Error on require module ${req.params.where}/${req.params.what}: ${err}`)
//   }
// });

// register
// remind-password
// images
// select
// from now token verify, but only for change calls

const io = socket(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (client) => {
    const user_ID = JSON.parse(JSON.stringify(client.handshake.query.user_ID))
    console.log(new Date().getTime())
    io.to(client.id).emit('compareDatabases', {
        "lastUpdated": { daily_measurement: new Date().getTime() },
        "version": 1
    })
});
