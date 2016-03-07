$(function(){

    $(".note_float").click(function(event) {
        $('.note_fenlei').slideDown();
    });
    $('.note_fenlei .close').click(function(event) {
        $('.note_fenlei').slideUp();
    });
    refunc();
    pic();
    $(window).resize(function(event) {
            refunc();
            pic();
    });

    function refunc(){
        $(".mmood_line .content .text").each(function(){
        var mheight=parseInt($(this).height())+20;
        $(this).prev().height(mheight);
        $(this).parent().prev().height(parseInt(mheight)+40);
        $(this).parent().prev().prev().css("line-height",mheight+'px');
    });
    };

    //登录提交
    $("#signinsub").click(function(){
        if($("input:checkbox").prop("checked")){
            localStorage.setItem("name",$("#signinName").val());
            localStorage.setItem("password",$("#signinPassword").val());
        }
        var name=$("#signinName").val();
        var password=$("#signinPassword").val();
    $.ajax({
        type:'post',
        url:'/user/signin',
        dataType:'json',
        data:{"user": {"name":name,"password":password}}
    })
    .done(function(results){
        if(results.error===1){
            alert("登录失败")
        }
        if(results.error===2){
            alert("密码错误")
        }
        if(results.success===1){
            alert("登录成功")
            window.location.reload();
        }
    })

    })
    
    //图片处理
    function pic(){
        var mpicw=$(".mpic_container").width();
        var mpich=$(".mpic_container").height();
        var imgcw=$(".mpic_container .imgc").width();
        var imgch=$(".mpic_container .imgc").height();
        var prevh=$(".mpic_container .prev").height();
        $(".mpic_container .prev").css("margin-top",(mpich-prevh)/2);
        $(".mpic_container .next").css("margin-top",(mpich-prevh)/2);
        $(".mpic_container img").load(function(){
            var picw=$(".mpic_container img").width();
            var pich=$(".mpic_container img").height(); 
            if(parseInt(picw)>parseInt(pich)){
                $(".mpic_container img").css("margin-left",(imgcw-picw)/2);
                $(".mpic_container img").css("margin-top",(imgch-pich)/2);
            }
            else{
                $(".mpic_container img").height(imgch); 
                $(".mpic_container img").width("auto"); 
                $(".mpic_container img").css("margin-left",(imgcw-picw)/2);
                $(".mpic_container img").css("margin-top",(imgch-pich)/2);
            }
      
        })     

    }

    //图片左右滑动
    var i=1;
    $(".mpic_container .next").click(function(){
        i++;
        if(i>=11){
            $(".next").addClass('none');
        }
        if(i>=12){
            i=11;
            return false;
        }
        $(".prev").removeClass('none');
        $(".mpic_container img").fadeOut(800,function(){

            $(this).attr("src","/mypic/"+i+".jpg").fadeIn();
        })
        pic();

    })
    $(".mpic_container .prev").click(function(){
        i--;
        if(i<=1){
            $(".prev").addClass('none');
        }
        if(i<=0){
            i=1;
            return false;
        }
        $(".next").removeClass('none');
        $(".mpic_container img").fadeOut(800,function(){
            $(this).attr("src","/mypic/"+i+".jpg").fadeIn();
        })
        pic();

    })
});
