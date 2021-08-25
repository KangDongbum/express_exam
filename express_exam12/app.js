const app = require('express')();
const bootStrap = require('./boot');
const cookieParser = require('cookie-parser');

app.use(bootStrap);
app.use(cookieParser());

app.use((req,res,next) =>{
	// 공동, 공유 라우터 -> 보조적인 역할 -> 실제 처리는 해당하는 라우터 -> next로 미들웨어 이동이 필요하다.
	console.log("사이트 로딩시 공통으로 처리할 부분이나, 기능추가");
	next();
});

// 미들웨어를 외부로 빼서 공통 라우터에 등록 -> 기능 확장, 기능 추가
app.get("/member",(req,res, next) =>{
	//return res.send("회원 페이지.."); //URL이 매칭이 되고 출력이 완료 -> END
	//next(); // 다음 매칭이 되는 미들웨어로
	const error = new Error('에러 발생!');
	next(error);
});

app.use((req,res,next) =>{ //없는 URL은 가장 하단의 공통 라우터에 매칭 -> 없는 페이지 처리 미들웨어
	//return res.send("없는 페이지 입니다");
	const error = new Error(`${req.url}은 없는 페이지 입니다.`); // 404 - NOT FOUND
	error.status = 404;
	next(error);
});

/** 오류페이지 처리 **/
app.use((err,req,res,next)=>{ // 인수(매개변수)가 4개 이상 -> 오류처리 미들웨어 
	return res.status(err.status || 500).send(err.message);
	/**
		throw 에러 객체
		next(에러 객체)
	*/
});

/*
app.get("/", (req,res) =>{
	return res.send("첫번째");
});
app.get("/", (req,res) =>{
	return res.send("두번째");
});

const memberRouter = require('./member');
app.use("/member", memberRouter); */
/*
app.get("/",(req,res,next)=>{
	console.log("1번 미들웨어");
	next();
},(req,res,next)=>{
	console.log("2번 미들웨어");
	next();
},(req,res)=>{
	console.log("3번 미들웨어");
	return res.send("");
}); */
/*
app.get("/", (req,res, next )=>{
	// 미들웨어는 request 요청 데이터 분석 -> 분석 -> response 객체 출력
	const text = req.url + ":" + req.method;
	
	return res.send(text);
}); */

/* 라우터 순서가 
app.get("/",(req, res, next) => {
	console.log("첫 번째 미들웨어");
	next();
});

app.get("/text",(req,res,next)=>{
	console.log("테스트1 미들웨어");
	next();
});

app.get("/",(req, res, next) =>{
	console.log("두 번째 미들웨어");
	next();
});

app.get("/",(req, res,next) =>{
	return res.send("세 번째 미들웨어");
	next();
});

app.get("/text",(req,res)=>{
	return res.send("테스트2 미들웨어");
}); */

app.listen(3000, () =>{
	console.log("서버 대기중...");
});


