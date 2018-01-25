(function ($) {
    var defaults = {
        selector: "",//指定翻页单叶子元素对象
        loop: true,//循环
        speed: 500,//速度
        startPage: 0,//起始页
        swipeX: true,//是否在X轴方向操作，否Y轴
        threshold: 50,//临界点
        subAnimation: false,//翻页过程中禁止页面内容元素动画渲染
        onPageLoad: function (res) {
            console.log("初始化")
        },//加载
        onPageBefore: function (res) { 
            console.log("动画前")
        },//动画前
        onPageAfter: function (res) { 
            console.log("动画后")
        },//动画后
        onPagePrev: function (res) {
            console.log("上一页")
         },//上页
        onPageNext: function (res) {
            console.log("下一页")
         }//下页
    }
    $.fn.jQueryDNpage = function (options) {
        var settings = $.extend({}, defaults, options);
        var $el = this;
        $el.page = {};
        $el.page.sub = $el.children(settings.selector);
        $el.wrap("<div id='jquery_DN_page'></div>")
        $el.page.box = $el.parent();
        var _css = {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative"
        }

        $el.css(_css);
        $el.page.box.css(_css);
        $el.page.sub.css({
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "absolute",
            top: 0, left: 0, zIndex: 0,
            listStyle: "none",
            display: "none"
        })

        $el.page.sub.eq(settings.startPage).css({
            zIndex: 168,
            display: "block",
        })

        $el.page.activeIndex = settings.startPage;
        settings.onPageLoad($el.page);
        $el.trigger("onPageLoad", $el.page);//trigger 手动触发

        if (settings.swipeX) {
            $el.page._key = "left";
        } else {
            $el.page._key = "top";
        }
        //初始化结束

        // 交互操作
        $el.page.box.bind("touchstart", function (e) {
            if ($el.page.workTag) return;
            $el.page.workTag = true;

            e.preventDefault();
            e.stopPropagation();

            $el.page.touchstart = {
                x: e.originalEvent.changedTouches[0].pageX,
                y: e.originalEvent.changedTouches[0].pageY
            };
            $el.page.touchdistance = {
                x: e.originalEvent.changedTouches[0].pageX - $el.page.touchstart.x,
                y: e.originalEvent.changedTouches[0].pageY - $el.page.touchstart.y
            };
            // 重载当前索引
            getID();

            if ($el.page.activePrev !== $el.page.activeIndex) {
                $el.page.sub.eq($el.page.activePrev).css({
                    zIndex: 169,
                    display: "block",
                    [$el.page._key]: "-100%"
                })
            }
            if ($el.page.activeNext !== $el.page.activeIndex) {
                $el.page.sub.eq($el.page.activeNext).css({
                    zIndex: 169,
                    display: "block",
                    [$el.page._key]: "100%"
                })
            }


            //绑定移动和结束事件
            $el.page.box.bind("touchmove", onTouchMove);
            $el.page.box.bind("touchend", onTouchEnd);


        })


        var onTouchMove = function (e) {
            if (!$el.page.workTag) retuen;

            e.preventDefault();
            e.stopPropagation();
            if (settings.swipeX) {
                $el.page.touchdistance.x = e.originalEvent.changedTouches[0].pageX - $el.page.touchstart.x;
            } else {
                $el.page.touchdistance.y = e.originalEvent.changedTouches[0].pageY - $el.page.touchstart.y;
            }
            var _cssstr = "translate(" + $el.page.touchdistance.x + "px," + $el.page.touchdistance.y + "px)";
            $el.page.sub.eq($el.page.activeIndex).css("transform", _cssstr);
            $el.page.sub.eq($el.page.activePrev).css("transform", _cssstr);
            $el.page.sub.eq($el.page.activeNext).css("transform", _cssstr);
        }


        var onTouchEnd = function (e) {
            e.preventDefault();
            e.stopPropagation();

            //解绑定移动和结束事件
            $el.page.box.unbind("touchmove");
            $el.page.box.unbind("touchend");

            if (settings.swipeX) {
                $el.page.touchdistance.x = e.originalEvent.changedTouches[0].pageX - $el.page.touchstart.x;
            } else {
                $el.page.touchdistance.y = e.originalEvent.changedTouches[0].pageY - $el.page.touchstart.y;
            }

            $el.page.workTag = false;

            $el.goToPage();
        }


  
        $el.goToPage = function (index) {
            if ($el.page.workTag) return;
            $el.page.workTag = true;

            var distance;
            getID();

            if (index && !isNaN(index)) {
                if (index > $el.page.activeIndex) {
                    $el.page.activeNext = index;
                    index = "next";
                } else {
                    $el.page.activePrev = index;
                    index = "prev";
                }
            }

            if (index === "next") {
                distance = 0 - (settings.threshold + 1)
                $el.page.sub.eq($el.page.activeNext).css({
                    zIndex: 169,
                    display: "block",
                    [$el.page._key]: "100%"
                })

                if (settings.subAnimation) {
                    console.log("停止所有子元素CSS渲染")
                    $el.page.sub.eq($el.page.activeNext).find("*").css({
                        "animation-play-state": "paused",
                        "-webkit-animation-play-state": "paused"
                    })
                }
            }else if (index === "prev") {
                distance = settings.threshold + 1;
                $el.page.sub.eq($el.page.activePrev).css({
                    zIndex: 169,
                    display: "block",
                    [$el.page._key]: "-100%"
                })

                if (settings.subAnimation) {
                    console.log("停止所有子元素CSS渲染")
                    $el.page.sub.eq($el.page.activePrev).find("*").css({
                        "animation-play-state": "paused",
                        "-webkit-animation-play-state": "paused"
                    })
                }
            } else {
                console.log("拖拽进入");
                distance = ($el.page.touchdistance.x + $el.page.touchdistance.y)
            }

            var _tra = ["translate(0,100%)", "translate(0,-100%)"];
            if (settings.swipeX) _tra = ["translate(100%,0)", "translate(-100%,0)"];

            var _Index_css, _Next_css, _Prev_css, _nowID;
            if (Math.abs(distance) > settings.threshold) {
                console.log("A 距离绝对值大于 阈值");

                if (distance < 0) {
                    console.log("1 当前层 往左或顶 移除元素 （-100%） 右边的为下一页")
                    _Index_css = _Next_css = { "transform": _tra[1] };
                    _nowID = $el.page.activeNext;

                    settings.onPageNext($el.page);
                    $el.trigger("onPageNext", $el.page);
                } else {
                    console.log("2 当前层 往右或底 移除元素 （100%） 左边的为上一页");
                    _Index_css = _Prev_css = { "transform": _tra[0] };
                    _nowID = $el.page.activePrev;

                    settings.onPagePrev($el.page);
                    $el.trigger("onPagePrev", $el.page);
                }
                settings.onPageBefore($el.page);
                $el.trigger("onPageBefore", $el.page);
            } else {
                console.log("B 距离绝对值 小于 阀值 回到原点");

                if (distance < 0) {
                    console.log("1 当前层 往右或底 正常位置 （translate(0,0)）");
                    _Index_css = _Next_css = { "transform": "translate(0,0)" };

                } else {
                    console.log("2 当前层 往左或顶 正常位置 （translate(0,0)）");
                    _Index_css = _Prev_css = { "transform": "translate(0,0)" };
                }

                _nowID = $el.page.activeIndex;
            }
            var pageAnimate = {
                "transition": "transform" + (settings.speed / 1000) + "s ease-in-out"
            };
        
            // setTimeout(function () {
                if (_Index_css){
                    $el.page.sub.eq($el.page.activeIndex).css({ _Index_css }).css({pageAnimate})
                } 
                if(_Next_css){
                    $el.page.sub.eq($el.page.activeNext).css({ _Next_css }).css({pageAnimate})
                }
                if (_Prev_css) {
                    $el.page.sub.eq($el.page.activePrev).css({ _Prev_css }).css({pageAnimate})
                }
            // }, 1000)

            $el.page.sub.eq($el.page.activeIndex).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (e) {
                console.log("过度效果完成：" + e.type);
                console.log(this);

                var _def = {
                    "transition": "none",
                    "transform": "none",
                    "left": 0,
                    "top": 0,
                    "z-index": 0,
                    "display": "none"
                }
                console.log(_def)

                $el.page.sub.eq($el.page.activeIndex).css(_def);
                $el.page.sub.eq($el.page.activeNext).css(_def);
                $el.page.sub.eq($el.page.activePrev).css(_def);

                $el.page.activeIndex = _nowID;
                $el.page.sub.eq($el.page.activeIndex).css({
                    display: "",
                    zIndex: 168
                })

                getID();

                if (settings.subAnimation) {
                    console.log($el.page.activeIndex + "继续播放所有子元素CSS动画渲染")
                    $el.page.sub.eq($el.page.activeIndex).find("*").css({
                        "animation-play-state": "running",
                        "-webkit-animation-play-state": "running"
                    })
                }

                $(this).off("transitionend webkitTransitionEnd");
                $el.page.workTag = false;

                settings.onPageAfter($el.page);
                $el.trigger('onPageAfter', $el.page);
            })
        }
        var getID = function () {
            $el.page.activePrev = $el.page.activeIndex - 1;
            $el.page.activeNext = $el.page.activeIndex + 1;

            if ($el.page.activeIndex === $el.page.sub.length - 1) {
                $el.page.activeNext = $el.page.activeIndex;
                if (settings.loop) $el.page.activeNext = 0;
            } else if ($el.page.activeIndex === 0) {
                $el.page.activePrev = 0;
                if (settings.loop) $el.page.activePrev = ($el.page.sub.length - 1);
            }
        }
        $el.goNext = function(){
            $el.goToPage("next");
        }
        $el.goPrev = function(){
            $el.goToPage("prev");
        }
        $el.getPage = function(){
           return $el.page;
        }
    }
})(jQuery)