const express = require("express");
const { Room } = require("../database/models");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("chat");
});

router.post('/add', (req, res) => {
	let roomDetail = {};

	roomDetail['name'] = req.body.name;
	
	if (req.body.maxUsers != "" && req.body.maxUsers != null)
		roomDetail['limit'] = req.body.maxUsers;

	Room.create(roomDetail).then(room => {
		if (room != null)
			res.json({ isSuccess: true });
		else
			res.json({ isSuccess: false });
	}).catch(err => {
		console.log(err);
		res.json({ isSuccess: true });
	});
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