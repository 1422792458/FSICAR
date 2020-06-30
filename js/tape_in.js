$(function(){
	var look_addr = location.href.substring(location.href.indexOf('?')+1);
	$('.easy_video').attr('video-url','http://36.7.107.222:8002'+ look_addr);
})