(function (root, factory) {
    root.$ = root.DN = factory();
})(window, function () {
    var DN = {
        memorize: function (f, hasher) {
            //  存储缓存
            var memoize = function (name) {
                var cache = memoize.cache;
                //    转化成字符串
                var key = "" + (hasher ? hasher.apply(this, arguments) : name);
                if (!cache[key]) {
                    cache[key] = f.apply(this, arguments);
                }
                return cache[key];
            }
            memoize.cache = {};
            return memoize;
        }
    }
    return DN
})