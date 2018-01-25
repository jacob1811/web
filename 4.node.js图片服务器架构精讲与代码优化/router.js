var util = require('util');
var url = require("url");
var hand = require("./requesthander.js");

function route(req,res){
    var pathName = url.parse(req.url).pathname;
   
    hander = hand.handle(req,res);
    if(typeof(hander[pathName])==="function"){
        console.log("about route to hander "+ pathName)
        hander[pathName](req,res);
    }else{
        console.log(pathName);
        res.writeHead(404,{"content-type":"text/plain"});
        res.write("404 , not found");
        res.end();
    }   
}
exports.route = route;