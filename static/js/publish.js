var sHostUrl = '';
var sUrlPublish = sHostUrl+'/api/publish'

$('#j-msg-send').click(function(){
	var sBtittle = $('#js-blog-tittle').val();
	var sBbrief = $('#js-blog-brief').val();
	var sBautor = $('#js-blog-autor').val();
	var sBdetail = $('#js-blog-detail').val();
	var sBtype = $('#js-blog-type option:selected').val();
	var sBtypeName = $("#js-blog-type option:selected").text();
	console.log('sBtype',sBtype);
	console.log('sBtypeName',sBtypeName);
	var jData = {};
	jData['tittle'] = sBtittle;
	jData['brief'] = sBbrief;
	jData['autor'] = sBautor;
	jData['detail'] = sBdetail;
	jData['typeid'] = sBtype;
	jData['typename'] = sBtypeName;
	// publish(jData);
});


// 请求服务器，把当前表单信息提交
function publish(jData){
	$.ajax({
		type:'get',
		url:sUrlPublish,
		data:jData,
		dataType:'text',
		success:function(data){
			//TODO 没有回调不知道为什么?
			// console.log('me-ajax',data);
			if (data == 'ok') {
				// $(location).attr('href','message.html');
				alert('发布成功了！');
			}else{
				alert('提交失败，请重试');
			}			
		}
	});
}


