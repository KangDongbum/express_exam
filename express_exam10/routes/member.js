const express =require('express');
const router = express.Router();
const member = require("../models/member.js");
const { alert, go } = require("../lib/common.js");


router.route("/join")
	.get((req,res)=>{ //회원 가입 양식
		return res.render("member/join");
	})
	.post(async (req,res)=>{ // 회원 가입 처리
		const result = await member.join(req.body);
		if(result) { //회원 가입 성공 -> 로그인 페이지 이동
			return go("/member/login", res, "parent");
		}
		
		//실패 -> 메세지
		return alert("회원가입 실패하였습니다.");
	});
	
router.route("/login")
	.get((req,res)=>{ // 로그인 양식
		return res.render("member/login");
	})
	.post((req,res)=>{ // 로그인 처리
		
	});
	
router.get("/logout", (req,res)=>{
	
});
module.exports =router;