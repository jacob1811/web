var uploadhand = require("./uploadhander.js");
var showhand = require("./showhander.js");
var starthand = require("./starthander.js");

function handle(req,res){
    var method= req.method.toLowerCase() == 'post'
    var hander={};
    hander['/upload'] = method?uploadhand.upload:"404";
    hander["/show"] = showhand.show;
    hander['/start'] = starthand.start;
    hander['/'] = starthand.start;
    
    return hander
}


exports.handle = handle;