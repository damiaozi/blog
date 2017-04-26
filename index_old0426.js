const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const routerMime = require('./router_mime.js');
const querystring = require('querystring');
const hostname = '127.0.0.1';
const port= 9999;
const mainUrl = 'static/index.html';
const server = http.createServer((req,res)=>{
	let theUrl = url.parse(req.url);
	console.log('theUrl',theUrl);
	let filePath = path.join(__dirname,'/static/',theUrl.path);

	if(theUrl.query == null){
		//无参数,返回html页面
		if (theUrl.path =='/'){
			filePath = path.join(__dirname,'static/index.html');
		}
		let filelas = '.'+filePath.match(/\.(\w+)$/)[1];
		// console.log('filelas',filelas);
		if (routerMime[filelas]) {
			console.log('routerMime',routerMime[filelas]);
			res.writeHead(200, {
			            "Content-Type": routerMime[filelas]
			});
			var stream = fs.createReadStream(filePath);
			stream.pipe(res);
			stream.on('end',function(){
				res.end();
			});
		}

	}
	else
	{
		//有参数,处理ajax请求
		let getReq = querystring.parse(theUrl.query);
		console.log('getReq',getReq);
		let json = {};
		//判断是什么接口
		
		let MongoClient = require('mongodb').MongoClient;
		let dbUrl = 'mongodb://127.0.0.1:27017/blog';
		MongoClient.connect(dbUrl,(err,db)=>{
			if(err){
				console.log('err',err);
				return false;
			}

			//查看访客数接口
			if (req.url.indexOf('getvisit')>=0) {
				if(getReq['main']){
					//查看主页的访客数据
					let cAppInfo = db.collection('app_info');
					cAppInfo.find({}).toArray((err,data)=>{
						console.log('res-end',data);
						// console.log('callback-data',data);
						let json = JSON.stringify(data[0]);
						console.log('json',json);
					 	res.writeHead(200, {});
						res.end(json);
					});
				}
			}

			//设置访客数接口
			if (req.url.indexOf('setvisit')>=0) {
				if(getReq['main']){
					//查看主页的访客数据
					let cAppInfo = db.collection('app_info');
					cAppInfo.find({}).toArray((err,data)=>{
						// console.log('res-end',data);
						
						// let json = JSON.stringify(data[0]);
						let json = data[0];
						// console.log('json',json);
						var num =json.visitnum;
						// num++;
						// console.log('num', num);
						var newnum = parseInt(num)+1;
						// console.log('newnum',newnum);
						 // cAppInfo.updateOne({a:1}, {$set:{b:2}});
						cAppInfo.update({visitnum:num},{$set:{visitnum:newnum}},(err,_res)=>{
							// console.log('update',_res);
							if (err) {
					            console.log("Error:" + err);
					            res.writeHead(300, {});
								res.end('err');
					        }else{
					        	res.writeHead(200, {});
								res.end('ok');
					        }
						});

					 	
					});
				}
			}
		
			
        });
				
		
	}

	

});

server.listen(port,hostname,()=>{
	console.log(`Server running at http://${hostname}:${port}/`);
});


// var Mongo = require('./system/mongo/init.js');
// function dbGetVisit(callback){
// 		let MongoClient = require('mongodb').MongoClient;
// 		let dbUrl = 'mongodb://127.0.0.1:27017/blog';
// 		MongoClient.connect(url,(err,db)=>{
// 			if(err){
// 				console.log('err',err);
// 				return false;
// 			}

// 			let cAppInfo = db.collection('app_info');
// 			let json = JSON.stringify(cAppInfo.find().toArray());
// 			console.log('res-end',json);
// 			if (typeof callback === "function"){
	            
// 	            this.callback(json); 
// 	        }
//        }
		
// 	}

