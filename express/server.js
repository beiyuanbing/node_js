var express = require('express');
var app = express();
var fs = require("fs");
var formidable = require('formidable');
var multiparty = require('multiparty');
var User=require("./controller/user");
app.use('/public', express.static('public'));
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.html" );
})
 
app.get('/process_get', function (req, res) {
   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   var user=new User();
   user.setName(req.query.first_name);
   user.setUrl(req.query.last_name);
   user.add();
   res.end(JSON.stringify(response));
});
//文件上传相关
app.post('/file',function(req, res) {
   let form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = 'utf-8';
  //设置文件存储路劲
  form.uploadDir = './tmplFile';
  form.parse(req, function (err, fields, files) {
   try {
     const content=fields.content;
     let inputFile = files.file[0];
     console.log(content);
     console.log(inputFile.originalFilename);
     let uploadedPath = inputFile.path;
     let newPath = form.uploadDir + "/" + inputFile.originalFilename;
     //同步重命名文件名 fs.renameSync(oldPath, newPath)
     fs.renameSync(inputFile.path, newPath);
     res.send({ data: "上传成功！" });
     //读取数据后 删除文件
     // fs.unlink(newPath, function () {
     //   console.log("删除上传文件");
     // })
   } catch (err) {
     console.log(err);
     res.send({ err: "上传失败！" });
   };
 });
})

var server = app.listen(8084, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
