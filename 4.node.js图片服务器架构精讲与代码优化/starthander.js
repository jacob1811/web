var fs = require("fs");
function start(req , res){
    //  show a file upload form 
     var body = fs.readFileSync("./post.html")
     res.writeHead(200, {'content-type': 'text/html'});
     res.write(body);
     res.end();
}
exports.start = start;