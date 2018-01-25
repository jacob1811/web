var http = require('http');
var router = require("./router")

    // //方法一
    // if(req.url==="/aaa"){}
    // else if(req.url==="/bbb"){}
    // // 方法二
    // switch(req.url){
    //     case "aaa":
    //     break;
    //     case "bbb":
    //        break;
    //        default:
    // }

function start(){
// onRequest 接受并处理http 请求
function onRequest(req,res){
    
    router.route(req,res);
       
    }
    http.createServer(onRequest).listen(8082,function(){
        console.log("serve is start 8082")
    });

}
exports.start = start;