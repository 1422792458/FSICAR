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

function video_tape(){
	$('.tape_list').empty();
	var id = $('.live_id').val();
	var time = $('#startTime').val().split("-").join("");
	$.ajax({
	  url: "http://36.7.107.222:8002/record/query_daily",
	  type:"GET",
	  async:false,
	  data:{
	  	token:token,
	  	id:id,
	  	period:time
	  },
	  success: function(html){
	  	if(html.list.length == 0){
  			$('.tape_list').append("<p class='getall'>无录像...</p>");
  		};
	  	for(var i=0;i<html.list.length;i++){
	  		
	  		var live_name = html.list[i].name;//设备id
	  		var live_time = html.list[i].start_time;//录像开始时间
	  		var look_addr = html.list[i].hls//录像观看地址
	  		// 格式化时间字符串
	  		var NewOccurTime = insertStr(insertStr(insertStr(insertStr(insertStr(live_time,4,"/"),7,"/"),10,"  "),14,":"),17,":");
	  		var li_modble = $('.tape_demo').html();
	  		$('.tape_list').append(li_modble);
	  		$('.tape_list .tape_con:last .l_name').text('直播ID:' + live_name);
	  		$('.tape_list .tape_con:last .l_time').text('录像时间:' + NewOccurTime);
	  		$('.tape_list .tape_con:last .tape_see').attr("href","tapelook.html?" + look_addr);	
	  		$('.tape_list .tape_con:last .tape_dl').attr("href","http://36.7.107.222:8002/record/download/" + live_name + '/' + live_time);//录像下载
	  	};
	  },
	  error: function(){
	  	$('.tape_list').append("<p class='getall'>无录像...</p>");
	  }
	});
	var id = $('.live_id').val('');
};
// 时间格式化函数
function insertStr(soure, start, newStr){   
   return soure.slice(0, start) + newStr + soure.slice(start);
}
$(function(){
	login();
});