const winston = require('winston');
const path = require('path');
const  fs = require('fs').promises;
const constants =require('fs').constants;

module.exports = async (message, mode) =>{
	const logDir = path.join(__dirname,'../logs');
	try{
		mode = mode || 'info';
		
			await fs.access(logDir, constants.F_OK);
			
			const date = new Date();
			
			// 파일명
			const year = date.getFullYear();
			let month = date.getMonth() + 1;
			month = (month < 10)?`0${month}`:month;
			let day = date.getDate();
			day = (day < 10 )?`0${day}`: day;
			const day2 = date.getDay();
			
			const filename = logDir + '/' + `${year}${month}${day}${day2}.log`
		
			//파일 내용 (시간)
			let hours = date.getHours();
			hours = ( hours < 10 )?`0${hours}`: hours;
			let mins = date.getMinutes();
			mins = (mins < 10 )?`0${mins}`:mins;
			let secs = date.getSeconds();
			secs = (sces < 10)?`0${secs}`: secs;
			
			const message = `[${hours}:${mins}:${secs}]${message}`
		
			const logger = winston.createLogger({
			  level: 'info',
			  format: winston.format.json(),
			  defaultMeta: { service: 'user-service' },
			  transports: [
				new winston.transports.File({ filename }),
			  ],
			});
			 
			if (process.env.NODE_ENV !== 'production') {
			  logger.add(new winston.transports.Console({
				format: winston.format.simple(),
			  }));
		}
		  logger.log({
			level : mode,
			message,
	  });
	}catch(err){
		if(err.code == 'ENOENT'){
			await fs.mkdir(logDir);
		}
	}
};