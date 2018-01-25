window.onload = function () {
    "use strict";
    function getNewValue(scope){
         return scope[this.name];
    }
    function $scope(){
        this.$$watchList = [];
    }
    $scope.prototype.$watch = function(name,getNewValue,listener){
            var watch = {
                name:name,
                getNewValue:getNewValue,
                listener:listener
            }
            this.$$watchList.push(watch);
    }
    $scope.prototype.$digest = function(){
        var list = this.$$watchList;
        var dirty = true;
        var checkTime = 0;
        while(dirty){
            dirty = false;
            for(var i=0,l=list.length;i<l;i++){
                var watch = list[i];
                console.log(watch);
                var newValue = watch.getNewValue(this);
                var oldValue = watch.last;
                if(newValue !== oldValue){
                  watch.listener(newValue,oldValue);
                  watch.last = newValue;
                  dirty = true;
                }
           }
           checkTime++;
           if(checkTime>=10 && checkTime){
                throw new Error("次数过多")
           }
        }
        
    }
    var scope = new $scope();
    scope.first = 0;
    scope.second = 0;
    scope.$watch("first",function(){
        return scope[this.name];
    },function(newValue,oldValue){
        scope.second++;
        console.log("newValue"+newValue+"----oldValue"+oldValue)
    })

    scope.$watch("second",function(){
        return scope[this.name];
    },function(newValue,oldValue){
        scope.first++;
        console.log("newValue"+newValue+"----oldValue"+oldValue)
    })
    scope.$digest();



}