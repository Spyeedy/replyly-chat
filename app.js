const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const dbConnection = require('./database/db_connection');
const indexRoute = require('./routes/index');
const chatRoute = require('./routes/chat');

// -- End of imports --

const app = express();
const server = http.createServer(app);
const io = socket(server);

dbConnection.setupDB(true);

// Set view engine
app.set('views', './views');
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, './views');

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoute);
app.use('/chat', chatRoute);

// IO Socket connections
io.on('connection', (socket) => {
    console.log("Successful socket connection");

    // Welcome current user
    socket.emit('message', 'Welcome to Replyly');

    // Broadcast when a user connects
    socket.broadcast.emit('joinMessage', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
})

const port = 5000;
server.listen(port, () => {
    console.log(`Listening to port ${port}`)
});