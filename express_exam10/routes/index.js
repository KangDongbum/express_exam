const express =require('express');
const router = express.Router();
const member = require('../models/member');

router.get("/", async (req, res)=>{
	const list = await member.getList();
	return res.render("main/index", { list });
});

module.exports =router;