$(function () {
    //   面向过程的实现 c c++ c# java
       var $contents = $(".ui-guide-content li");
       $btnNext =  $("[data-ug-btype='next']")
        $("[data-ug-btype='prew']").hide();
        $("[data-ug-btype=\"prew\"]").on("click",function(){
            var _index = $(".ui-guide .ui-guide-step li[data-ug-active=\"true\"]").removeAttr("data-ug-active")
           .prev().attr("data-ug-active","true").removeAttr("data-ug-over","true").index();
           $contents.each(function(){
               $(this).removeAttr("data-ug-active")
           })
           $("[data-ug-btype='next']").show();
           $("[data-ug-btype='finish']").hide();
        
           if(_index===0){
              $("[data-ug-btype='prew']").hide();
           }
           $contents.eq(_index).attr("data-ug-active","true");
        })
        $("[data-ug-btype='next']").on("click",function(){
           var _index = $(".ui-guide .ui-guide-step li[data-ug-active=\"true\"]").removeAttr("data-ug-active")
           .attr("data-ug-over","true").next().attr("data-ug-active","true").index();
           $contents.each(function(){
               $(this).removeAttr("data-ug-active")
           })
           $("[data-ug-btype='prew']").show();
           if(_index===$contents.length-1){
            $("[data-ug-btype='finish']").show();
            $("[data-ug-btype='next']").hide();
           }
           $contents.eq(_index).attr("data-ug-active","true");
        })
        $("[data-ug-btype='finish']").on("click",function(){
            console.log("33")
        })
    });