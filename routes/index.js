const express = require("express");
const { Room } = require("../database/models");

const router = express.Router();

router.get("/", async(req, res) => {
	const rooms = await Room.findAll();
    res.render('index', { rooms });
});

module.exports = router;