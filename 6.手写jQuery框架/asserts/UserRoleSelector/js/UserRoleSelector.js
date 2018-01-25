var UserRoleSelector = (function () {
    // 定义UserRoleSelector类型构造器
    var UserRoleSelector = function (options) {
        this.init(options || {});//防止不传入，null 指针
        // this.render();
        this.bind();
    }
    var html =
        '<div class="container user-role-selector">' +
        '<ul class="left-list data-list">' +
        '</ul>' +
        '<div class="data-oper">' +
        '<a href="#" class=" add button">添加</a>' +
        '<a href="#" class=" del button">删除</a>' +
        '</div>' +
        '<ul class="right-list data-list">' +
        '</ul>' +
        '<div class="data-bar">' +
        '<a href="#" class="close button">关闭</a>' +
        '<a href="#" class="save button">保存</a>' +
        '</div>' +
        '</div>'
    // 扩展实例功能
    UserRoleSelector.prototype = {
        init: function (options) {
            this.options = options;//初始化
            this.dom = document.createElement("div");
            this.dom.className = "mask";
            this.dom.style.display = this.options.show ? "block" : "none";
            this.dom.innerHTML = html;
            this.status = this.options.show ? 0 : 1;//0不显示；1显示
            document.body.appendChild(this.dom);
            this.left = this.dom.querySelector(".left-list.data-list");
            this.right = this.dom.querySelector(".right-list.data-list");
            this.save = this.dom.querySelector(".button.save");
            this.close = this.dom.querySelector(".button.close");
            this.add = this.dom.querySelector(".button.add");
            this.del = this.dom.querySelector(".button.del");
            var data = this.options.data || [];
            for (var i = 0; i < data.length; i++) {
                this.left.innerHTML += "<li data-value = " + data[i].value + ">" + data[i].text + "</li>";
            }
            this.items = this.left.querySelectorAll("li");
        },
        // render:function(){
        //    this.dom.innerHTML = html;

        // },
        bind: function () {
            var _this = this;
            this.close.onclick = function () {
                _this.hide();
            }
            this.add.onclick = this._operClick.bind(this, this.add)
            this.del.onclick = this._operClick.bind(this, this.del);
            // this.add.onclick = this.del.onclick = this._operClick.bind(this,1,2);
            this.del.onclick = function () {
                var selects = _this.right.querySelectorAll(".selected");
                for (var i = 0; i < selects.length; i++) {
                    _this.left.appendChild(selects[i]);
                }
            }
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].onclick = this._itemClick;
            }
            // this.save.onclick = function(){
            //     this.options.onSave.call(_this);
            // }
            if (this.options.onSave) {
                this.save.onclick = _this.options.onSave.bind(_this);
            }
        },
        show: function () {
            console.log(this.status)
            if (this.status === 1) {
                this.status = 0;
                this.dom.style.display = "block";
            } else {
                this.status = 1;
                this.dom.style.display = "none";
            }
        },
        hide: function () {
            this.status = 1;
            this.dom.style.display = "none";
        },
        _itemClick: function () {
            if (this.className.indexOf("selected") != -1) {
                this.className = "";
            } else {
                this.className = "selected"
            }
        },
        _operClick: function (target) {
            var one, two;
            // event.target
            if (target.className.indexOf("add") != -1) {
                one = this.left;
                two = this.right;
            } else {
                one = this.right;
                two = this.left;
            }
            var selecteds = one.querySelectorAll("li.selected");
            for (var i = 0; i < selecteds.length; i++) {
                two.appendChild(selecteds[i]);
            }

        },
        getValue: function () {
            var values = "";
            var selecteds = this.right.querySelectorAll("li");
            for (var i = 0; i < selecteds.length; i++) {
                values += selecteds[i].getAttribute("data-value");
                if(i!=selecteds.length-1){
                    values+=","
                }
            }
            return values;
        }

    }
    return UserRoleSelector;
})()