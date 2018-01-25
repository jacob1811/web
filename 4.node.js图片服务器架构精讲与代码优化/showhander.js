var fs = require('fs');
function show(req,res){
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
exports.show = show;