window.onload = function () {
    "use strict";
    var scope = {
        increase: function () {
            this.data++;
        },
        decrease: function () {
            this.data--;
        },
        data: 0,
        faciend: 5,
    }
    function Scope() {
        this.$$watchList = [];
    }


    // function getNewValue(scope){
    //      return scope[this.name];
    // }
    // function $scope(){
    //     this.$$watchList = [];
    // }
    Scope.prototype.$watch = function (name, getNewValue, listener) {
        var watch = {
            name: name,
            getNewValue: getNewValue,
            listener: listener || function () { }
        }
        this.$$watchList.push(watch);
    }
    Scope.prototype.$digest = function () {
        var list = this.$$watchList;
        var dirty = true;
        var checkTime = 0;
        while (dirty) {
            dirty = this.$$digestOnce();
            checkTime++;
            if (checkTime > 10 && dirty) {
                throw new Error("检测超过10次");
                console.log("123")
            }

        }

    }
    Scope.prototype.$$digestOnce = function () {
        var dirty;
        var list = this.$$watchList;
        for (var i = 0, l = list.length; i < l; i++) {
            var watch = list[i];
            console.log(watch);
            var newValue = watch.getNewValue(this);
            var oldValue = watch.last;
            if (newValue !== oldValue) {
                watch.listener(newValue, oldValue);
                dirty = true;
            } else {
                dirty = false;
            }
            watch.last = newValue;
        }
        return dirty;

    }
    var $scope = new Scope();
    $scope.sum = 0;
    $scope.$watch("sum", function () {
        $scope.sum = scope.data * scope.faciend;
        return $scope[this.name];
    }, function (newValue, oldValue) {
        scope.sum = newValue;
        console.log("newValue" + newValue + "----oldValue" + oldValue)
    })

    
    function bind() {
        var list = document.querySelectorAll("[ng-click]");
        for (var i = 0, l = list.length; i < l; i++) {
            list[i].onclick = (function (index) {
                return function () {
                    var func = this.getAttribute("ng-click");
                    scope[func](scope);
                    $scope.$digest();
                    apply();
                }
            })(i);
        }
    }
    function apply() {
        var list = document.querySelectorAll("[ng-bind]");
        for (var i = 0, l = list.length; i < l; i++) {
            var bindData = list[i].getAttribute("ng-bind");
            console.log("应用属性："+bindData+"为"+scope[bindData])
            list[i].innerHTML = scope[bindData]
        }
    }
    bind();
    $scope.$digest();
    apply();
}