

var jQuery = (function (window) {
    function jQuery(arg) {//构造函数
        switch (typeof arg) {
            case "function":
                myAddevent(window,"load",arg);
                break;
            case 'string':
                break;
            case "object":
                break;
        }

    }
    function $(arg) {
        return new jQuery(arg);
    }
    function myAddevent(obj, type, fn) {
        if (obj.addEventListener)
            obj.addEventListener(type, fn, false);
        else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        };
    }
    window.jQuery = window.$ = $;


})(window);//调用 返回值
console.log($().__proto__)
