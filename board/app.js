const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const path = require('path');
const logger = require('./lib/logger');
const bootStrap = require("./boot"); //사이트 초기화 미들웨어
const { sequelize } = require('./models');

const app = express();
dotenv.config();
app.use(morgan('dev'));

sequelize.sync({ force : false })
	.then(() =>{
		logger("데이터 베이스 연결 성공");
	})
	.catch((err) => {
		logger(err.message, 'error');
		logger(err.stack, 'error');
	});

app.set('PORT', process.env.PORT || 3000);

/** 라우터 **/
const mainRouter = require('./routes/main');
const memberRouter = require('./routes/member'); // 회원 관련

/** 템플릿 설정 **/
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"),{
	express : app,
	watch : true,
});

/**정적 경로 **/
app.use(express.static(path.join(__dirname, "public")));

/**body-parser **/
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

/** cookieParser **/
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave : false,
	saveUninitialized : true,
	secret : process.env.COOKIE_SECRET,
	name : 'dongbumID',
}));

/** 사이트 초기화 **/
app.use(bootStrap);

/** 라우터 등록 **/
app.use(mainRouter);
app.use("/member", memberRouter); // 회원 관련

/** 없는 페이지 처리 **/
app.use((req, res,next) =>{
	const error = new Error(`${req.url}은 없는 페이지 입니다.`);
	error.status = 404;
	next(error);
});

/** 오류 페이지 처리 **/
app.use((err, req, res, next) =>{
	// 500 - internal server error, 404 - NOT FOUND
	
	/**
		message, status, stack
	*/
	const data = {
		message : err.message,
		status : err.status || 500,
		stack : err.stack,
	};
	
	logger(`[${data.status}]${data.message}`,'error');
	logger(err.stack,'error');
	if(process.env.NODE_ENV === 'production'){
		delete data.stack;
	}
	
	return res.status(data.status).render('error',data);
});
app.listen(app.get('PORT'),()=>{
	console.log(app.get('PORT'), "번 포트에서 서버 대기중...");
});