var formidable = require('formidable');
var fs = require('fs');
function upload(req,res){
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
}
exports.upload = upload;