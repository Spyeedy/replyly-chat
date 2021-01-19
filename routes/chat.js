const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("chat");
});

module.exports.router = router;
module.exports.chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Successful socket connection");
    
        // Broadcast when a user connects
        socket.broadcast.emit("joinMessage", "A user has joined the chat");
    
        // Runs when client disconnects
        socket.on("disconnect", () => {
            io.emit("userLeft", "A user has left the chat");
		});
		
		socket.on("newMessage", (message) => {
			console.log("newMessage:", message);
			io.emit("newMessage", "A new message!");
		})
    })
};