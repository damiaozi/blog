var sHostUrl = '';
var sUrlPublish = sHostUrl+'/api/publish'
var sUrlBlogdtl = sHostUrl+'/api/blogdetail'
var sUrlBlogdpd = sHostUrl+'/api/blog_update'
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

//如果存在blogid则为更新修改博文
if (sBlogid) {
	getBlogDetail();
}

// 请求服务器，获取当前博客详情数据
function getBlogDetail(){
	$.ajax({
		type:'get',
		url:sUrlBlogdtl,
		data:{'blogid':sBlogid},
		dataType:'json',
		success:function(data){
			console.log('blog_detail',data);
			// console.log('blog_detail',data.tittle);
			// console.log('blog_detail',data['tittle']);
			
			$('#js-blog-tittle').val(data.tittle);
			$('#js-blog-autor').val(data.autor);
			$('#js-blog-detail').val(data.detail);
			$('#js-blog-brief').val(data.brief);

			$('#js-blog-type').val(parseInt(data.typeid));
			$('#js-blog-type').find(`option[text="${data.typeid}"]`).attr("selected",true);
			// $("#js-blog-type option:selected").text(data.typename);
			// $('#j-autorimg').attr('src','images/tou.jpg');
	
		}
	});
}



//发布按钮点击事件
$('#j-msg-send').click(function(){
	var sBtittle = $('#js-blog-tittle').val();
	var sBbrief = $('#js-blog-brief').val();
	var sBautor = $('#js-blog-autor').val();
	var sBdetail = $('#js-blog-detail').val();
	var sBtype = $('#js-blog-type').val();
	var sBtypeName = $("#js-blog-type option:selected").text();
	// console.log('sBtype',sBtype);
	// console.log('sBtypeName',sBtypeName);
	var jData = {};
	jData['tittle'] = sBtittle;
	jData['brief'] = sBbrief;
	jData['autor'] = sBautor;
	jData['detail'] = sBdetail;
	jData['typeid'] = sBtype;
	jData['typename'] = sBtypeName;

	if (sBlogid) {
		jData['blogid'] = sBlogid;
		publish(sUrlBlogdpd,jData,1);
	}else{
		publish(sUrlPublish,jData,0);
	}
	
});


// 发布新博文，请求服务器，把当前表单信息提交
function publish(sUrl,jData,iType){
	//0为新增，1为更新
	$.ajax({
		type:'get',
		url:sUrl,
		data:jData,
		dataType:'text',
		success:function(data){
			// console.log('me-ajax',data);
			if (data == 'ok') {
				// $(location).attr('href','message.html');
				if (iType) {
					alert('更新成功了！');
				}else{
					alert('发布成功了！');
				}
				
			}else{
				alert('提交失败，请重试');
			}			
		}
	});
}


