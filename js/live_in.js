var token;

function login(){
	$.ajax({
	  url: "http://36.7.107.222:8002/login",
	  type:"POST",
	  async:false,
	  data:{
	  	username:'admin',
	  	password:'21232f297a57a5a743894a0e4a801fc3',//md5加密密码
	  	onlytoken:false,
	  },
	  success: function(html){
	    token=html.token;
	  }
	});
	return token;
};

function live_sessions(){
	var sessionId = location.href.substring(location.href.indexOf('=')+1);
	var windowWidth = $(window).width(); 
	$.ajax({
	  url: "http://36.7.107.222:8002/live/sessions",
	  type:"POST",
	  async:false,
	  data:{
	  	token:token,
	  	id:sessionId
	  },
	  success: function(html){
  		var in_num = html.NumOutputs+1;//观看人数
	  	var live_tit = html.Name;//直播名称
	  	var rtmp_addr = html.RTMP;//rtmp播放地址
	  	var flv_addr = 'http://36.7.107.222:8002' + html['HTTP-FLV']//FLV播放地址
	  	var hls_addr = 'http://36.7.107.222:8002' + html.HLS//HLS播放地址
	  	var v_url = flv_addr;
	  	if (window.ActiveXObject || "ActiveXObject" in window){
			v_url=hls_addr;
		};
	  	if(windowWidth < 1100){
	  		v_url=hls_addr;
	  	};
  		if (live_tit){
	  		$('.room_tit').text('直播名称:'+live_tit);
	  		$('.room_num').html('<img src="./img/look.png" alt="">' + in_num);
	  		$('.easy_video').attr('video-url',v_url);
	  	};
	  	
	  }
	});
	
};

$(function(){
	live_sessions();
	login();
})