const router = require('express').Router();
const { adminOnly } = require("../../middlewares/member");
/**
* 관리자 페이지 라우터
*
*/


router.get("/",(req,res) =>{
	router.use(adminOnly);
	return res.send("관리자 페이지 메인");
});

module.exports = router;

