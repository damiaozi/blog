var sHostUrl = '';
var sUrlGetVisit = sHostUrl+'/api/getvisit'
var sUrlSetVisit = sHostUrl+'/api/setvisit'


// 请求服务器，获取当前总访客数量
$.ajax({
	type:'get',
	url:sUrlGetVisit,
	data:{'main':'0'},
	dataType:'json',
	success:function(data){
		console.log(data);
		$('#visit_index').html(data['visitnum']);
		// 请求服务器，增加一个总访客数量
		$.ajax({
			type:'get',
			url:sUrlSetVisit,
			data:{'main':'0'},
			dataType:'json',
			success:function(data){
				console.log(data);
			}
		});
	}
});

