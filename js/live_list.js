//登录
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
	  	console.log(html.token)
	    token=html.token;
	  }
	});
	return token;
};

// 正在直播列表
function livein_list(){
	var plhtml = $('.plul').html();
	$('.plul').empty();
	$.ajax({
		url: "http://36.7.107.222:8002/live/sessions",
		async:false,
		type:"POST",	
		data:{
			token:token,
		},	
		success: function(html){
		  	for (var i = 0; i < html.length; i++) {
		  		if(html[i].Application=='record') 
		  			continue;
		  		var lv_name = html[i].Name;//直播标题
		  		var lv_looknum = html[i].NumOutputs+1;//直播观看人数
		  		var lv_id = html[i].Id;//直播设备id
		  		img_url = "http://36.7.107.222:8002/record/getsnap?id=" + lv_id + '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc0NDY1OTQsInB3IjoiMjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzMiLCJ0bSI6MTU4NzM2MDE5NCwidW4iOiJhZG1pbiJ9.LjEichh5iTmdvQN4dJJBHmEjP2jDTxU1wICkzMky7eM'
		  		$('.plul').append(plhtml);
		  		$('.plul .lipaly:last .live_text .liv_name').text('直播标题:' + lv_name)
		  		$('.plul .lipaly:last .live_text .liv_num').text('观看人数:' + lv_looknum)
		  		$('.plul .lipaly:last').attr('href','./videocon.html?id='+lv_id);
		  		$('.plul .lipaly:last .lvin_img').attr('src',img_url);
		  	};
		 }
	})
};
$(function(){
	login();
	livein_list();
})