var  shareObj = function(shareTitle,shareText,shareUrl,shareImage){

	return {
		shareSinaWeibo:function(){
			window.open("http://service.weibo.com/share/share.php?url=" + shareUrl  + "&title=" + encodeURIComponent(shareText)   
		+"&pic="+ shareImage + "&searchPic=false","_blank","width=600,height=550");
		},

		shareTXWeibo:function(){
			window.open("http://v.t.qq.com/share/share.php?url="+shareUrl+"&site="+shareUrl+"&title="+encodeURIComponent(shareText)
		+"&pic="+ shareImage,"_blank","width=600,height=550");
		},

		shareDouban:function(){
			window.open("http://www.douban.com/share/service?image="+shareImage+"&href="+shareUrl+"&name="+shareTitle
		+"&text="+encodeURIComponent(shareText),"_blank","width=600,height=550");
		},

		shareKaixin:function(){
			window.open("http://www.kaixin001.com/rest/records.php?url="+shareUrl+"&site="+shareUrl+"&content="+encodeURIComponent(shareText)+"&url="
		+location.href+"&starid=&aid=0&style=11&pic="+shareImage+"&site="+location.href,"_blank","width=600,height=550");
		},

		shareRenren:function(){
			window.open("http://widget.renren.com/dialog/share?resourceUrl="+shareUrl+"&srcUrl"+shareUrl+"&title="
		+encodeURIComponent(shareTitle)+"&images="+ shareImage +"&description="+encodeURIComponent(shareText),"_blank","width=600,height=550");
		},

		shareQQ:function(){
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+encodeURIComponent(shareUrl)+
				"&title="+encodeURIComponent(shareTitle)+"&pics="+shareImage+"&summary="+encodeURIComponent(shareText)+"&desc="+encodeURIComponent(shareText),"_blank","width=600,height=550");
		}

	}

}


$(function(){


    var shareAll = shareObj("快来看看我的个人主页吧！","平凡无奇也能创造一段奇迹，我是张小猫，我为自己代言~","http://mywebb.duapp.com/","http://mywebb.duapp.com/images/mylife_p3.jpg")

    //分享QQ空间
    $(".toqq").click(function(){
        shareAll.shareQQ();
    });

    //分享人人
    $(".torenren").click(function(){
        shareAll.shareRenren();
    });

    //分享新浪微博
    $(".toweibo").click(function(){
        shareAll.shareSinaWeibo();
    });


    //分享豆瓣
    $(".todouban").click(function(){
        shareAll.shareDouban();
    });
    	
    	
       //分享腾讯微博
    $(".totencent").click(function(){
        shareAll.shareTXWeibo();
    });
    	

    $(".closeerweima").click(function(){
    	$(".erweima").css("display","none");
    });	



})