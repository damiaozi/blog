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
				var sLiHtml = `<li class="blog-item"><div class="blog-content">
							<a href="blog_detail.html?blogid=${_id}"><h2>${json.tittle}</h2></a>
							<div class="blog-tag"><i></i><a href="Javascript:;">${json.typename}</a></div>
							<a href="blog_detail.html?blogid=${_id}"><p class="blog-review">${json.brief}</p></a>
							<div class="blog-info">
								<div class="blog-time">
									<i></i>
									<span>${json.createtime}</span>
								</div>
								<div class="blog-read">
									<i>阅</i>
									<span>${json.readnum}</span>
									<i>评</i>
									<span>${json.comtnum}</span>
									<i>赞</i>
									<span>${json.colnum}</span>
							</div></div></div></li>`;
				$(sLiHtml).appendTo(oBlogLst);
			}	
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


