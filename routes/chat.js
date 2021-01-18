const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render('chat');
});

module.exports.router = router;
module.exports.chatSocket = (io) => {
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
};