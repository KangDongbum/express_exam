const express = require('express');
const { joinValidator, loginValidator } = require("../middleware/member");
const { alert } = require("../lib/common");
const router = express.Router();
const member = require("../models/member");
/**
 /member/join - 회원가입 (양식, 처리)
 /member/login - 로그인 (양식, 처리)
 /member/logout - 로그아웃

 */
 // 회원 가입
 router.route("/join")
		.get((req,res)=>{
			return res.render("member/join");
		})
		.post(joinValidator, async (req,res)=>{
			const result = await member.join(req.body);
			if(result){ //가입 성공 -> 로그인 페이지로 이동
				return res.redirect("/member/login");
				
			}
			//가입 실패 -> 메세지, 다시 회원 가입 양식으로
			return alert("회원가입 실패하였습니다.", res, true);
		});
// 로그인
router.route("/login")
		.get((req,res)=>{
			return res.render("member/login");
		})
		.post(loginValidator, async (req,res)=>{
			const result = await member.login(req.body.memId, req.body.memPw, req);
			if(result){ //로그인 성공시 -> 메인페이지로 이동
				return res.redirect("/");
			}
			return alert("로그인에 실패하였습니다.",res.true);
		});
// 로그아웃
router.route("/logout", (req,res) =>{
	res.session.destroy(); //세션 전체 비우기 -> 로그아웃
	return res.redirect('/'); // 로그아웃 되면 메인페이지로 이동
});

module.exports = router;