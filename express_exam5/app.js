const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const path = require('path');
const logger = require('./lib/logger');

const app = express();

dotenv.config();

app.set('view engine','html');
nunjucks.configure(path.join(__dirname,'views'),{
	express: app,
	watch: true,
});

app.set("PORT", process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use((req,res,next) =>{
	const err = new Error(`${req.url}은 없습니다.`);
	err.status=404;
	next(err);
});

app.use((err,req,res,next) =>{

	const data ={
		message : err.message,
		status : err.status || 500,
		stack : err.stack,
	};
	
	//로그 기록
	logger(`[${data.status}]${data.message}`,'error');
	logger(data.stack, 'error');
	
	if(process.env === 'production'){
		delete data.stack;
	}
	return res.status(data.status).render("error",data);
});	

app.listen(app.get("PORT"), () =>{
	console.log(app.get("PORT"),"번 포트 로딩중...");
});