function addvideo(){
	var videoHtml = $('.palymain').html();
	var bz = 0;//判断扩展框展开状态
	$('.btn').click(function(){//添加屏幕按钮点击
		$('.alertmb').show();
	});
	$('.clebtn').click(function(){//提示框关闭按钮点击
		$('.alertmb').hide();
		$('.videoid').val('');
		$('.prompt').text('');
	});
	$('.alebtn').click(function(){//提示框确定按钮点击

		videoId = $('.videoid').val();
		if($('.videoid').val()==''){//判断ID输入框是否为空
			prompt();
			return
		};
		$.ajax({
			url: "http://36.7.107.222:8002/live/get",
			type:"GET",
			data:{
				id:videoId
			},
			success: function(html){
				if(html.session){
					var videoUrl = 'http://36.7.107.222:8002/flv/hls/'+$('.videoid').val()+'.flv';//视屏播放地址
					$('.alertmb').hide();
					$('.palymain').append(videoHtml);
					$(".playvideo").last().children().attr('video-url',videoUrl);
					$('.videoid').val('');
					
				}else{
					$('.prompt').text('该设备未开始直播!');
					$('.prompt').fadeIn("slow");
				}
			}
		});
	});
	$('.maxbox').click(function(){
		// $('.scrnsele').hide();
		fullScreenFun();
	});
	$('.collbox').click(function(){//扩展框动画函数
		if(bz == 0){
			bz=1
			$('.scrnsele').css({left:"-415px"})
			$('.collbox').css({transform:"rotate(180deg)"})
		}else{
			bz=0
			$('.scrnsele').css({left:"0px"})
			$('.collbox').css({transform:"rotate(0deg)"})
		}
	});
	$('.scrnnum').change(function() {//分屏数字函数
	    console.log($(this).val())
	    if($(this).val()==16){
	    	$('.playvideo').css({width:"24.75%"})
	    	$('.addvideo').css({width:"24.75%"})
	    }else{
	    	$('.playvideo').css({width:"49.7%"})
	    	$('.addvideo').css({width:"49.7%"})
	    }
	})
};
function prompt(){//ID输入框是否为空执行函数
	console.log(videoId);
	$('.prompt').text('直播ID不能为空!');
	$('.prompt').fadeIn("slow");
}
function fullScreenFun(){//全屏方法函数
    var iFullscreen = false; //当前是否全屏状态
    var fullscreenEnabled = document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled;

    if (fullscreenEnabled) {
      let de = document.documentElement;
      if (iFullscreen) {
        //关闭全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      } else {
        //打开全屏
        if (de.requestFullscreen) {
          de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen();
        }
      }
    } else {
      alert('浏览器当前不能全屏');
    }
}
function isFullscreenForNoScroll(){//判断浏览器是否全屏
    var explorer = window.navigator.userAgent.toLowerCase();
    if(explorer.indexOf('chrome')>0){//webkit
        if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
            // alert("全屏");
        } else {
            // alert("不全屏");
            $('.scrnsele').show();
        }
    }else{//IE 9+  fireFox
        if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
            // alert("全屏");
        } else {
            // alert("不全屏");
            $('.scrnsele').show();
        }
    }
}
$(function(){
	addvideo();
	$(".palymain").empty();
});
document.body.parentNode.style.overflowY = "hidden";
$("body").parent().css("overflow-y","hidden");