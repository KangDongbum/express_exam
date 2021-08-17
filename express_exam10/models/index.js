const Sequelize = require('sequelize'); //Sequrelize

const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env]; // 각 운영 상황에 따른 DB 계정 설정

const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
	sequeliez 인스턴트
			1) DB 연결 .sync
			2) SQL 실행 .query
								-> Sequelize.QueryTypes - SELECT, UPDATE, INSERT, DELETE
								
	Sequelize
*/

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;