var userid = window.localStorage.userid;
var oLoginOutLi = $('#loginout');
var oLoginOutA = $('#loginout>a');
if (userid) {
    //已经登录
    oLoginOutA.css('color','red');
    oLoginOutLi.click(loginOut);
    oLoginOutA.html('退出登录');
	// location.href = 'index.html';
}else{
    //未登录
    oLoginOutA.css('color','#fff');
    oLoginOutA.html('登录');
	oLoginOutLi.click(toLogin);
}


function toLogin(){
    location.href = 'login.html';
}

function loginOut(){
	if(window.confirm('你确定退出登录吗？')){
         window.localStorage.clear();
         location.href = 'index.html';
         return true;
      }else{
         //alert("取消");
         return false;
     }
}