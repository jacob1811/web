
(function (root, factory, plug) {
    factory.call(root, root.jQuery, plug);
})(window, function ($, plug) {
    var __BUTTONS__ = "<div class=\"ui-guide-button\">" +
        " <button data-ug-btype=\"prew\">" +
        " <i class=\"icon iconfont icon-left\"></i>" +
        "上一步" +
        "</button>" +
        "<button data-ug-btype=\"next\">" +
        " <i class=\"icon iconfont icon-right1\"></i>" +
        "下一步" +
        "</button>" +
        "<button data-ug-btype=\"finish\">" +
        "<i class=\"icon iconfont icon-right\"></i>" +
        "完成" +
        "</button>" +
        "</div>"
    var __DEF_TEMP__ =
        " <dl>" +
        "<dt>" +
        "<i class='icon iconfont icon-right'></i>" +
        "<b>{serial}</b>" +
        "</dt>" +
        "<dd>{text}</dd>" +
        "</dl>" +
        "<span class='ui-guide-stepline'></span>"
    var _DEFAULT_ = {
        stepData: [],//默认空
        stepTemplate: __DEF_TEMP__,//默认模版
        activeIndex: 0 //默认0 content
    }
    var _PROTP_ = {
        _init: function () {
            this.addClass("ui-guide");
            this.$steps = this.children("[data-ug-step]").addClass("ui-guide-step");
            this.$contents = this.children("[data-ug-content]").addClass("ui-guide-content");
            this.$buttons = this.children("[data-ug-button]").addClass("ui-guide-button");
        },
        _genSteps: function () {
            var _$this = this;
            var _$steps = this.$steps;
            $.each(this.stepData, function (index, data) {
                console.log(data)
                _$steps.find("li").eq(index).append(_$this._genStepByTemplate(_$this.stepTemplate, data))
            })
            for (var i = 0; i < this.activeIndex; i++) {
                this.$steps.find("li").eq(i).attr("data-ug-over", "true");
            }
            this.$steps.find("li").eq(this.activeIndex).attr("data-ug-active", "true");
            this.$contents.find("li").eq(this.activeIndex).attr("data-ug-active", "true")
        },
        _genStepByTemplate: function (temp, data) {
            for (var prop in data) {
                temp = temp.replace("{" + prop + "}", data[prop]);
            }
            return temp;
        },
        _genButtons: function () {
            this.$buttons.append(__BUTTONS__);

        },
        _bindEvent:function(){
            var _$this=this;
            var $contents = this.$contents.find("li");
            if(_$this.activeIndex==0){
                $("[data-ug-btype='prew']").hide();
            }
            
             $("[data-ug-btype=\"prew\"]",this.$buttons).on("click",function(){
                 var $active = $("li[data-ug-active=\"true\"]",_$this.$steps)
                $contents.each(function(){
                    $(this).removeAttr("data-ug-active")
                })
                $("[data-ug-btype='next']").show();
                $("[data-ug-btype='finish']").hide();
             
                if($active.index()===1){
                   $("[data-ug-btype='prew']").hide();
                }
                var _index = $active.removeAttr("data-ug-active")
                .prev().attr("data-ug-active","true").removeAttr("data-ug-over","true").index();
                $contents.eq(_index).attr("data-ug-active","true");
                _$this.activeIndex--;
                _$this.trigger("prew",[_$this.activeIndex]);//触发上一步
             })
             var $next = $("[data-ug-btype=\"next\"]",this.$buttons)
                $next.on("click",function(){
                var _index = $("li[data-ug-active=\"true\"]",_$this.$steps).removeAttr("data-ug-active")
                .attr("data-ug-over","true").next().attr("data-ug-active","true").index();
                $contents.each(function(){
                    $(this).removeAttr("data-ug-active")
                })
                $("[data-ug-btype='prew']").show();
                // var len = $("[data-ug-step] ul li" ).size();
                if(_index===$contents.length-1){
                 $("[data-ug-btype='finish']").show();
                 $("[data-ug-btype='next']").hide();
                }
                $contents.eq(_index).attr("data-ug-active","true");
                _$this.activeIndex++;
                _$this.trigger("next",[_$this.activeIndex]);//触发下一步
             })
             $("[data-ug-btype='finish']",this.$buttons).on("click",function(){
                 _$this.trigger("finish");//触发完成
             })
        }
    }
    $.fn[plug] = function (options) {
        $.extend(this, _PROTP_, _DEFAULT_, options);
        this._init();//初始化
        this._genSteps();//生成步骤栏
        this._genButtons();//生成按钮
        this. _bindEvent();//事件绑定
        return this;//链式返回
    }
}, "uiGuide")
