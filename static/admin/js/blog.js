// 顶部类别隐藏
var oBlogType = $('#j-blog-type');
var showBlogType = function(){
	if(oBlogType.css('display') == 'none'){
		oBlogType.css('display','block');
	}else{
		oBlogType.css('display','none');
	}
};

$('#j-blog-search').click(showBlogType);


// 请求服务器，获取当前博客列表数据
var sHostUrl = '';
var sUrlBloglst = sHostUrl+'/api/bloglist'
var oBlogLst = $('#blog-list');

//分页的ul标签
var oPageLst = $('#j-page-list');

getBlogLst(1);

//分类id
var nTypeid = -1;
var aTypeA = $('#j-blog-type a');
aTypeA.click(function(){
	nTypeid = $(this).attr('data-typeid');
	bPageInit = false;
	getBlogLst(1);
});

function getBlogLst(page){
	$.ajax({
		type:'get',
		url:sUrlBloglst,
		data:{'page':page,'rows':10,'typeid':nTypeid},
		dataType:'json',
		success:function(json){
			// console.log('blog_list',json);
			var total = json['total'];
			var data = json['data'];
			oBlogLst.children().remove();
			//创建li标签，并且把数据填上，再添加到ul标签里
			for(var i in data){
				var json = data[i];
				var _id = json._id;
				var sLiHtml = `<li class="blog-item" data-blogid=${_id}><div class="blog-content">
							<a href="blog_detail.html?blogid=${_id}"><h2>${json.tittle}</h2></a>
							<div class="blog-tag"><i></i><a href="Javascript:;">${json.typename}</a></div>
							<a href="blog_detail.html?blogid=${_id}"><p class="blog-review">${json.brief}</p></a>
							<div class="blog-info">
								<div class="blog-time">
									<i></i>
									<span>${json.createtime}</span>
								</div>
								<div class="blog-read">
									<a id='j-read' href='Javascript:;'>
									<i>阅</i>
									<span>${json.readnum}</span>
									</a>
									
									<a id='j-coment' href='Javascript:;'>
									<i>评</i>
									<span>${json.comtnum}</span>
									</a>
									
									<a class='j-zan' href='Javascript:;' data-index=${i} data-blogid=${_id}>
									<i>赞</i>
									<span>${json.colnum}</span>
									</a>
							</div></div>
							<div class="blog-tool">							
							<div class="blog-delete js-delete" data-blogid=${_id}>
								<i></i>
								<span>删除</span>
							</div>
							<div class="blog-update js-update" data-blogid=${_id}>
								<i></i>
								<span>修改</span>
							</div>
							</div>
							</div></li>`;
				$(sLiHtml).appendTo(oBlogLst);
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
	var sUrlBlogdel = sHostUrl+'/api/blog_delete'
	$('.js-delete').each(function(){
		$(this).click(function(){
			var blogid = $(this).attr('data-blogid');
			$.ajax({
				type:'get',
				url:sUrlBlogdel,
				data:{'blogid':blogid},
				dataType:'text',
				success:function(data){
					// console.log('zan',data);	
					if(data =='ok'){
						alert('删除成功');
						//更新ui的界面
						//删除对应的选项 、、todo
						$(`.blog-item[data-blogid=${blogid}]`).remove();
					}
					
				}
			});
		});
	});
	//更新
	$('.js-update').each(function(){
		$(this).click(function(){
			var blogid = $(this).attr('data-blogid');
			location.href = 'publish.html?blogid='+blogid;
		});
	});
}