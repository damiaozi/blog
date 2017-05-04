
// 请求服务器，获取当前留言列表数据
var sHostUrl = '';
var sUrlMsglst = sHostUrl+'/api/msglist'
var oMsgLst = $('#msg-list');

//分页的ul标签
var oPageLst = $('#j-page-list');

getBlogLst(1);

function getBlogLst(page){
	$.ajax({
		type:'get',
		url:sUrlMsglst,
		data:{'page':page,'rows':10},
		dataType:'json',
		success:function(json){
			console.log('msg_list',json);
			var total = json['total'];
			var data = json['data'];
			oMsgLst.children().remove();
			//创建li标签，并且把数据填上，再添加到ul标签里
			for(var i in data){
				var json = data[i];
			
				var sLiHtml = `<li class="message-item" data-msgid=${json._id}>
					<div class="message-content">
						<div class="message-title">
							<img src="images/tou.jpg">
							<p class="msg-user">
								<a href="#">${json.name}</a>
								<span>${json.createtime}</span>
							</p>
						</div>
						<p class="message-review">
							   ${json.content}
						</p>
						<a href="#" class="message-read">
								<i>赞</i>
								<span>${json.colnum==null?0:json.colnum}</span>	
						</a>
						<div class="blog-tool">							
							<div class="blog-delete js-delete" data-msgid=${json._id}>
								<i></i>
								<span>删除</span>
							</div>
							
							</div>
						</div></li>`;
				$(sLiHtml).appendTo(oMsgLst);
			}	

			//初始化删除和修改的点击事件
			initUiTool();

			//初始化之后就不重复执行了
			if (!bPageInit) {
				pageInit(total);
			}
		
			
		}
	});
}
var bPageInit = false;
//初始化分页的数据
function pageInit(total){
	bPageInit = true;
	oPageLst.children().remove();
	//分页选项设置total个
	for (var i = 0; i < total; i++) {
		var sLi = `<li><a href="#">${i+1}</a></li>`;
		$(sLi).appendTo(oPageLst);
	}

	var oPageLi = $('#j-page-list li');
	oPageLi.click(function(){
		var nPage = $(this).index()+1;
		// console.log('oPageLi.click',nPage);
		getBlogLst(nPage);
	});
}


function initUiTool(){
	var sUrlMsgdel = sHostUrl+'/api/msg_delete'
	$('.js-delete').each(function(){
		$(this).click(function(){
			var msgid = $(this).attr('data-msgid');
			$.ajax({
				type:'get',
				url:sUrlMsgdel,
				data:{'msgid':msgid},
				dataType:'text',
				success:function(data){
					// console.log('zan',data);	
					if(data =='ok'){
						alert('删除成功');
						//更新ui的界面
						//删除对应的选项 、、todo
						// $(this).remove();
						$(`.message-item[data-msgid=${msgid}]`).remove();
					}
					
				}
			});
		});
	});
}

