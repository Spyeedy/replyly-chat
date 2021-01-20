const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');

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

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', indexRoute);
app.use('/chat', chatRoute.router);

// IO Socket connections
chatRoute.chatSocket(io);

const port = 5000;
server.listen(port, () => {
    console.log(`Listening to port ${port}`)
});