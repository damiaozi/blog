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
	// console.log('theUrl',theUrl);
	let filePath = path.join(__dirname,'/static/',theUrl.path);
	filePath = filePath.split('?')[0];
	if(theUrl.query==null || theUrl.path.indexOf('/api')<0){
	
		//无参数,返回html页面
		if (theUrl.path =='/'){
			filePath = path.join(__dirname,'static/index.html');
		}
		// console.log('filePath',filePath);
		let filelas = '.'+filePath.match(/\.(\w+)$/)[1];
		// console.log('filelas',filelas);
		if (routerMime[filelas]) {
			// console.log('routerMime',routerMime[filelas]);
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
		// console.log('getReq',getReq);
		let json = {};
		//判断是什么接口
		
		let MongoClient = require('mongodb').MongoClient;
		var ObjectID = require('mongodb').ObjectID
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
						// console.log('res-end',data);
						// console.log('callback-data',data);
						let json = JSON.stringify(data[0]);
						// console.log('json',json);
					 	res.writeHead(200, {});
						res.end(json);
						db.close();
					});
				}
			}

			//设置访客数接口
			else if (req.url.indexOf('setvisit')>=0) {
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
					        db.close();
						});	
					});
				}
			}
		
			//获取文章详情接口
			else if (req.url.indexOf('blogdetail')>=0){
				if(getReq['blogid']){
					//传了blogid这个字段
					let cBlogTb = db.collection('blog_tb');
						// console.log('cBlogTb',cBlogTb);
						findOneData(cBlogTb,{_id:ObjectID(getReq['blogid'])},(data)=>{
							 // console.log('findOneData',data);
							let json = JSON.stringify(data);
							// console.log('findOneJson',json);
							res.writeHead(200, {});
							res.end(json);
							db.close();
						});

					function findOneData(collection,qurery,callback){
						collection.findOne(qurery,(err,r)=>{

							if (typeof callback =='function') {
								callback(r);
							}
						});
					}
				}else{
					//404  没有这篇文章
				}
			}

			//获取文章列表接口
			else if (req.url.indexOf('bloglist')>=0){
				if(getReq['page']){
					let nPage = parseInt(getReq['page']);
					// console.log('nPage',nPage);
					// console.log('nPage',typeof nPage);
					// console.log('ppage',parseInt(nPage));
					let nRows = parseInt(getReq['rows']);
					// console.log('nRows',nRows);

					let nSkip = (nPage-1)*nRows;
					// console.log('nSkip',nSkip);
					//传了blogid这个字段
					let cBlogTb = db.collection('blog_tb');
					cBlogTb.find({}).skip(nSkip).limit(nRows).toArray((err,data)=>{
						// console.log('findData',data);
						let json = JSON.stringify(data);
						
						//计算总共有多少条数据，返回页码给total
						cBlogTb.count((err,count)=>{
							let total = Math.ceil(count/10);
							json = `{"total":${total},"data":${json}}`;
						
							// console.log('findJson',json);
							res.writeHead(200, {});
							res.end(json);
							db.close();
						});
						
					});

					// function findData(collection,query,limit,callback){
					// 	collection.find(query,limit).toArray((err,r)=>{

					// 		if (typeof callback =='function') {
					// 			callback(r);
					// 		}
					// 	});
					// }
				}else{
					//404  没有这篇文章
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

