/**
 * Created by xiaoma on 2016/8/7.
 */
$(function () {
    $(".all-list>ul>li").mouseover(function () {
        $(this).find("img").stop().animate({
            left: 70
        },15);
        $(this).find("h3").stop().animate({
            left: -100
        },1000);
        $(this).find(".price").stop().animate({
            left: 90
        }, 1000);
        $(this).find(".buy").stop().animate({
            left: 70
        }, 1000);
        $(this).find(".s").stop().animate({
            width: 272
        }, 800,function(){
            console.log(this);
            $(this).siblings(".y").stop().animate({
                height: 348
            }, 500);
        });

        $(this).find(".z").stop().animate({
            height: 346
        }, 800,function(){
            console.log(this);
            $(this).siblings(".x").stop().animate({
                width: 274
            }, 500);
        });

    });
    $(".all-list>ul>li").mouseout(function(){
        $(this).find("img").stop().animate({
            left: 137
        },15);
        $(this).find("h3").stop().animate({
            left: 137
        }, 1000);
        $(this).find(".price").stop().animate({
            left: 274
        }, 1000);
        $(this).find(".buy").stop().animate({
            left: 274
        }, 1000);

        $(this).find(".s").stop().animate({
            width: 0
        }, 800,function(){
            console.log(this);
            $(this).siblings(".y").stop().animate({
                height: 0
            }, 500);
        });

        $(this).find(".z").stop().animate({
            height: 0
        }, 800,function(){
            console.log(this);
            $(this).siblings(".x").stop().animate({
                width: 0
            }, 500);
        });
    });
});