Vue.component('todo-item', {
    template: "<li>{{todo.text}}  逗比</li>",
    props: ["todo"]
})
var app1 = new Vue({
    el: "#app-1",
    data: {
        name: "jacob",
        job: "worker",
        website: "http://www.baidu.com"
    },
    methods: {
        getNews: function (item) {
            return "hello    " + this.name + "   " + item
        }
    }
})

var app2 = new Vue({
    el: "#app-2",
    data: {
        message: "悬停此处时间" + new Date().toLocaleString(),
        seen: false,
        website: "http://www.baidu.com",
        news: "you are a fold",
        todos: [
            { text: '学习 JavaScript' },
            { text: '学习 Vue' },
            { text: '整个牛项目' }
        ]
    },
    methods: {
        getNews: function (item) {
            return "hello    " + this.name + "   " + item
        },
        reseveNew: function () {
            this.news = this.news.split("").reverse().join("")
        }
    }
})
var app3 = new Vue({
    el: "#app-3",
    data:{
        groceryList: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
})


