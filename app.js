const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

// Set view engine
app.set('views', './views');
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, './views');

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log("Successful socket connection");

    // Welcome current user
    socket.emit('message', 'Welcome to Replyly');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
})

const port = 5000;
server.listen(port, () => {
    console.log(`Listening to port ${port}`)
});