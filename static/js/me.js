var sHostUrl = '';
var sUrlSetMsg = sHostUrl+'/api/setmsg'

$('#j-msg-send').click(function(){
	var sMsgname = $('#js-msg-name').val();
	var sMsgphone = $('#js-msg-phone').val();
	var sMsgcont = $('#js-msg-cont').val();
	var jData = {};
	jData['userid'] = 0;
	jData['name'] = sMsgname;
	jData['contact'] = sMsgphone;
	jData['content'] = sMsgcont;
	setMsg(jData);
});


// 请求服务器，把当前表单信息提交
function setMsg(jData){
	$.ajax({
		type:'get',
		url:sUrlSetMsg,
		data:jData,
		dataType:'text',
		success:function(data){
			//TODO 没有回调不知道为什么?
			// console.log('me-ajax',data);
			if (data == 'ok') {
				$(location).attr('href','message.html');
			}else{
				alert('提交失败，请重试');
			}			
		}
	});
}


