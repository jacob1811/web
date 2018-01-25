window.onload = function () {
    "use strict";
    var scope = {
        increase: function () {
            this.data++;
        },
        decrease: function () {
            this.data--;
        },
        data: 0
    }

    function bind() {
        var list = document.querySelectorAll("[ng-click]");
        for (var i = 0, l = list.length; i < l; i++) {
            list[i].onclick = (function (index) {
                return function () {
                    var func = this.getAttribute("ng-click");
                    scope[func](scope);
                    apply();
                }
            })(i);
        }
    }
    function apply() {
        var list = document.querySelectorAll("[ng-bind]");
        for (var i = 0, l = list.length; i < l; i++) {
            var bindData = list[i].getAttribute("ng-bind");
            list[i].innerHTML = scope[bindData]
        }
    }
    bind();
    apply();

}