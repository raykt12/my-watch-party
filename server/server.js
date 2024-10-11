const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('videoLoaded', (url) => {
        socket.broadcast.emit('videoLoaded', url);
    });

    socket.on('videoPlayed', (time) => {
        socket.broadcast.emit('videoPlayed', time);
    });

    socket.on('videoPaused', (time) => {
        socket.broadcast.emit('videoPaused', time);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
