/**
 * bootstrap validator 手写插件
 * 匿名函数调用，闭包结构
 */
(function(root,factory,plug){
   console.log(root,factory,plug)
   return factory(root.jQuery,plug)
})(window,function($,plug){
    //默认参数
    var _DEFS_={
        trigger:"change"
    }
     var _RULES_={
         required:function(){
             return this.val()!=="";
         },
         regex:function(){
            return new RegExp(this.data("dv-regex")).test(this.val());
         },
         email:function(){
            return  /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/.test(this.val());
         },
         uri:function(){
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(this.val())
         },
         integer:function(){
            return /^[0-9]+.?[0-9]*/.test(this.val());
         },
         greaterthan:function(){
             return Number(this.val())>Number(this.data("dv-greaterthan"));
         },
         lessthan:function(){
            return Number(this.val())<Number(this.data("dv-lessthan"));
         }
     }
    $.fn[plug]= function(options){
        $.extend(this,_DEFS_,options);
        var $fileds = this.find("input").not("[type = button],[type = reset],[type = submit]")
        $fileds.on(this.trigger,function(){
            var $filed = $(this);
            var result = true;
            $filed.next().remove();
            $.each(_RULES_,function(rule,validator){
                if($filed.data("dv-"+rule)){
                    // console.log($filed.attr("name")+"需要验证"+rule+"规则")
                    result = validator.call($filed);
                    if(!result){
                        $filed.after("<p>"+$filed.data("dv-"+rule+"-message")+"</p>")
                        // console.log(rule+"验证失败"+$filed.data("dv-"+rule+"-message"))
                    }
                    return result
                }
            })
        })
    }
},"dnValidator")