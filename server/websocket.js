const server = require('http').createServer();
const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', client => {
    console.log(client.id)
});

server.listen(1000);