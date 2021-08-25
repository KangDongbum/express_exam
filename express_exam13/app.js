const express= require('express'); 
const { sequelize } = require("./models/index.js");
const nunjucks = require('nunjucks');
const boardRouter = require('./routes/board');

const app = express();

app.set("view engine", "html");
nunjucks.configure("views", {
	express : app,
	watch : true,
});

/** 
	데이터베이스 연결
	sequelize.sync{ force : false }
				.then()
				.catch()
*/

sequelize.sync({ force : false })
			.then(()=>{
				console.log("데이터베이스 연결 성공");
			})
			.catch((err)=>{
				console.log(err);
			});

app.use(express.json());
app.use(express.urlencoded({ extended : false }));


app.use("/board",boardRouter);

app.listen(3000, () =>{
	console.log("서버 대기중!");
});