var formidable = require('formidable');
var http = require('http');
var util = require('util');
var fs = require('fs');



function start(){
// onRequest 接受并处理http 请求
function onRequest(req,res){
    
        if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
            // parse a file upload
            var form = new formidable.IncomingForm();
            form.uploadDir = "public/upload/"
            
            form.parse(req, function(err, fields, files) {
                fs.renameSync(files.myFile.path,"tmp/test.png")
              res.writeHead(200, {'content-type': 'text/html'});
              res.write('received image:<br>');
              res.write("<img src='/show'>");
              res.end();
            });
            
            return;
            }else if(req.url ==='/show'){
                console.log("request for show is received.");
                //当前目录下二进制读取
                fs.readFile("tmp/test.png","binary",function(error,file){
                    if(error){
                        res.writeHead(500, {'content-type': 'text/plain'});
                        console.log(error);
                        res.write('500 服务器内部错误');
                        res.end(util.inspect({fields: fields, files: files}));
                    }else{
                        res.writeHead(200, {'content-type': 'image/png'});
                        console.log(error);
                        res.write(file,"binary");
                        res.end();
                    }
                })
                return ;
                
            }
            
            // show a file upload form
             var body = fs.readFileSync("./post.html")
            res.writeHead(200, {'content-type': 'text/html'});
            res.write(body);
            res.end();
            
    }
    http.createServer(onRequest).listen(8082,function(){
        console.log("serve is start 8082")
    });

}
exports.start = start;