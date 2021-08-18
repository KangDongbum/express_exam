const express = require('express');
const router = express.Router();
const board = require('../models/board.js');

router.route("/write")
	.get((req, res) =>{
		
		return res.render("/board/form");
	})
	.post(async (req, res) =>{
		const num = await board.write(req.body);
		console.log(num);
	});

module.exports = router;