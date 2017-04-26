// 顶部类别隐藏
var oBlogType = $('#blog-type');
var showBlogType = function(){
	if(oBlogType.css('display') == 'none'){
		oBlogType.css('display','block');
	}else{
		oBlogType.css('display','none');
	}
};

$('#blog-search').click(showBlogType);