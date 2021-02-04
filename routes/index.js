const express = require("express");
const { Room } = require("../database/models");

const router = express.Router();

router.get("/", async(req, res) => {
	const rooms = await Room.findAll();
    res.render("index", { rooms });
});

router.get("/join-chat", (req, res) => {
	res.render("join-chat");
});

router.get("/login", (req, res) => {
	res.render("login");
})

module.exports = router;