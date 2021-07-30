const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

/** multer 설정 부분 const upload = multer({... 설정 ...}); **/
const upload =multer({
	storage : multer.diskStorage({
		destination(req, file, done){ //destination : function(req,file,done) 랑 같음
			done(null, path.join(__dirname,"../public/upload"));	
		},
		filename(req, file, done){
			/**
				파일명 + timestamp + 확장자 -> 중복을 방지
			**/
			const ext = path.extname(file.originalname);
			const filename = path.basename(file.originalname, ext); + "_" + Date.now() + ext;
			done(null, filename);
		},
	}),
	limits : { fileSize : 10 * 1024 * 1024 }, //10mb
});


router.get('/',(req,res)=>{
	return res.render('file');
});

router.post('/upload', upload.single,(req,res)=>{
	console.log(req.file);
	return res.send("");
});

router.post('/upload2', upload.array('file'), (req,res)=>{
	console.log(req.files);
	return res.send("");
});

router.post('/upload3', upload.fields([{ name : 'file1' }, { name : 'file2'}]),(req,res)=>{
	console.log(req.files);
	return res.send("");
});

module.exports = router;
