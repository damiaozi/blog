var userid = window.localStorage.userid;
if (userid) {
	location.href = 'publish.html';
}else{
	location.href = 'login.html';
}