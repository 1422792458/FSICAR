var page_size = 12;//主页直播间列表分页大小
// var token;
// function login(){
// 	$.ajax({
// 	  url: "http://36.7.107.222:8002/login",
// 	  type:"POST",
// 	  async:false,
// 	  data:{
// 	  	username:'admin',
// 	  	password:'21232f297a57a5a743894a0e4a801fc3',//md5加密密码
// 	  	onlytoken:false,
// 	  },
// 	  success: function(html){
// 	    token=html.token;
// 	  }
// 	});
// 	return token;
// };
function live(page){
	$.ajax({
		url: "http://36.7.107.222:8002/live/list",
		async:false,
		type:"POST",
		data:{
			start:page*page_size,
			limit:page_size,
			// token:token,
		},
		success: function(html){
		  	// 循环直播间列表
		  	livelist(html.rows);
		  	// 分页
		  	page_it(html.total,page)

		 }
	})
};
var prehtml = $('.live_topli').html();
function livelist(html){
	$('.live_topli').empty();
	for (var i = 0; i < html.length; i++) {
		var item=html[i]
		var name = item.name;
		var live_in = item.session!=undefined?'正在直播':'未直播'
		var live_id = item.id;
		//直播封面
		var img_url = 'http://36.7.107.222:8002/record/getsnap?id=' + live_id + '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc0NDY1OTQsInB3IjoiMjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzMiLCJ0bSI6MTU4NzM2MDE5NCwidW4iOiJhZG1pbiJ9.LjEichh5iTmdvQN4dJJBHmEjP2jDTxU1wICkzMky7eM'
		$('.live_topli').append(prehtml);
		$('.live_topli li:last').parent().attr('href','./videocon.html?id='+live_id);
		$('.live_topli li:last img:first').attr('src',img_url);
		$('.live_topli li:last .live_text p:first').text('直播名称:' + name);
		$('.live_topli li:last .live_text p:last').text('直播状态:' + live_in);		
	}
};


function page_it(total,page){
	page_con = Math.ceil(total/page_size);
	
	$('.page ul').empty();
	if(page_con<=1)return;
	if(page>0){
		$('.page ul').append('<a href="javascript:;"><li num="'+(page-1)+'">上一页</li></a>');
	}
	var page_str = '<a href="javascript:;"><li num="{num0}">{num}</li></a>';
	for (var i = 0; i < page_con; i++) {
		$('.page ul').append(page_str.replace('{num}',(i+1)).replace('{num0}',i));
		if(i==page){$('.page ul a:last li').addClass('active');}
	}
	if(page<page_con-1){
			$('.page ul').append('<a href="javascript:;"><li num="'+(page+1)+'">下一页</li></a>');
	}

	$('.page ul a li').click(function(){
		live(parseInt($(this).attr('num')));
		livezt();
	});
};
// 正在直播列表
function livein_list(){
	$.ajax({
		url: "http://36.7.107.222:8002/live/sessions",
		async:false,
		type:"POST",	
		data:{
			// token:token,
		},	
		success: function(html){
		  	var liveNum = 0;
		  	for (var i = 0; i < html.length; i++) {
		  		if(html[i].Application=='record') 
		  			continue;

				var rtmp_addr = html[i].RTMP//rtmp播放地址
				var flv_addr = 'http://36.7.107.222:8002' + html[i]['HTTP-FLV']//FLV播放地址
				var hls_addr = 'http://36.7.107.222:8002' + html[i].HLS//HLS播放地址
				var windowWidth = $(window).width(); 
				var v_url = flv_addr;
				if (window.ActiveXObject || "ActiveXObject" in window){
					v_url=hls_addr;
				};
				if(windowWidth < 900){
					v_url=hls_addr
				}

		  		$('.listvideo .liveli:eq('+liveNum+')').attr('v_url',v_url)

		  		$('.listvideo .mb:eq('+liveNum+') span').text(html[i].Name);
		  		$('.listvideo .livelima:eq('+liveNum+') img').attr('src', 'http://36.7.107.222:8002/record/getsnap?id=' + html[i].Id + '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc0NDY1OTQsInB3IjoiMjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzMiLCJ0bSI6MTU4NzM2MDE5NCwidW4iOiJhZG1pbiJ9.LjEichh5iTmdvQN4dJJBHmEjP2jDTxU1wICkzMky7eM');//直播封面

		  		$('.listvideo .liveli:eq('+liveNum+')')
		  		.click(function(){
		  			$('.easy_video').attr('video-url',$(this).attr('v_url'));
		  		});
				liveNum++;
		  		if(liveNum>=6)break;
		  	}
		  	if(liveNum<6){
		  		for (var i=5; i >= liveNum; i--) {
		  			$('.listvideo li:eq('+i+')').remove();
		  		}
		  	}
		 }
	})
};
// 直播搜索
function find_live(){
	var find_id = $('.videourl').val();
	var windowWidth = $(window).width(); 
	if(windowWidth < 1100){
		$('.easy_video').attr("video-url","http://36.7.107.222:8002/hls/" + find_id + "/" + find_id + "_live.m3u8")
	}else{
		$('.easy_video').attr("video-url","http://36.7.107.222:8002/flv/hls/" + find_id + ".flv")
	}
	$('.videourl').val("");
};
// 直播状态样式
function livezt(){
	var lizt = $('.live_zt');
	for (var i=0;i<lizt.length;i++){
		var lizt_text = $(lizt[i]).text();
		if(lizt_text=='直播状态:正在直播'){
			$(lizt[i]).css({color:'#1296db',})
		}
	}
	
};
function lg_on(){
	var bz = location.href.substring(location.href.indexOf('?')+1);
	if(bz=='bz=lgon'){
		$('.easy_video').attr('video-url',$('.listvideo li:first').attr('v_url'));
		$('#container').hide();

	};
};
$(function(){
	prehtml = $('.live_topli').html()
	$('.live_topli').empty();
	// login();
	live(0);
	livein_list();
	livezt();
	lg_on();
	// $('.easy_video').attr('video-url',$('.listvideo li:first').attr('v_url'));
})

