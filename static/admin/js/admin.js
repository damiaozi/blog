var userid = window.localStorage.userid;
if (userid) {
	// location.href = 'index.html';
}else{
	location.href = 'login.html';
}
$('#loginout').css('color','red');
$('#loginout').click(loginOut);

function loginOut(){
	if(window.confirm('你确定退出登录吗？')){
         window.localStorage.clear();
         location.href = 'login.html';
         return true;
      }else{
         //alert("取消");
         return false;
     }
}