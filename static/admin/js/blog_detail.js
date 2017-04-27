
var sHostUrl = '';
var sUrlBlogdtl = sHostUrl+'/api/blogdetail'
var sBlogid =getUrlParam('blogid');
console.log(sBlogid);

//获取url中的参数
function getUrlParam(name) {
	//构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) {
    	return unescape(r[2]); 
    }
    return null; //返回参数值
}



// 请求服务器，获取当前博客详情数据
$.ajax({
	type:'get',
	url:sUrlBlogdtl,
	// data:{'blogid':'59000a3c46e446c911e9bdc7'},
	data:{'blogid':sBlogid},
	dataType:'json',
	success:function(data){
		console.log('blog_detail',data);
		// console.log('blog_detail',data.tittle);
		// console.log('blog_detail',data['tittle']);
		$('#j-tittle').html(data.tittle);
		$('#j-autorname').html(data.autor);
		$('#j-time').html(data.createtime);
		$('#j-content').html(data.detail);
		$('#j-readnum').html(data.readnum);
		$('#j-comtnum').html(data.comtnum);
		$('#j-colnum').html(data.colnum);
		$('#j-blog-type').html(data.typename);
		$('#j-autorimg').attr('src','images/tou.jpg');

		
	}
});

