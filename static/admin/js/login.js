var sHostUrl = '';
var sUrlReg = sHostUrl+'/api/reg';
var sUrlLogin = sHostUrl+'/api/login';


var oSletLogin = $('#j-slet-login');
var oSletReg = $('#j-slet-regist');
var oSection = $('#j-section-login');

var isLogin = true;
oSletLogin.click(function(){
	isLogin = true;
	oSection.addClass('active');
});

oSletReg.click(function(){
	isLogin = false;
	oSection.removeClass('active');
});

$('#j-msg-regist').click(function(){
	dologres();
});
$('#j-msg-login').click(function(){
	dologres();
});

function dologres(){
	var sUusername = $('#js-login-username').val();
	var sUpassword =$('#js-login-password').val();
	var sUuname = $('#js-login-uname').val();

	// console.log('sBtype',sBtype);
	// console.log('sBtypeName',sBtypeName);
	var jData = {};
	jData['username'] = sUusername;
	jData['password'] = sUpassword;
	jData['isAdmin'] = 1;
	
	
	if (isLogin) {
		login(jData);
	}else{
		jData['uname'] = sUuname;
		regist(jData);
	}
}


// 注册
function regist(jData){
	$.ajax({
		type:'get',
		url:sUrlReg,
		data:jData,
		dataType:'json',
		cache:false,
		success:function(data){
			console.log('regist-ajax',data);
			if (data.status == 1) {
				// $(location).attr('href','message.html');
				alert(data.msg);
			}else{
				alert(data.msg);
			}			
		}
	});
}
// 登录
function login(jData){
	$.ajax({
		type:'get',
		url:sUrlLogin,
		data:jData,
		dataType:'json',
		cache:false,
		success:function(data){
			console.log('regist-ajax',data);
			if (data.status == 1) {
				// $(location).attr('href','message.html');
				alert(data.msg);
				window.localStorage.userid = data.userid;
				location.href = 'publish.html';
			}else{
				alert(data.msg);
			}				
		}
	});
}

