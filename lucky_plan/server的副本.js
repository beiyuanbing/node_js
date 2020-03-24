var express = require('express');
var app = express();
var fs = require("fs");
var multiparty = require('multiparty');
var uuid = require('uuid');
//json格式
var bodyParser = require('body-parser');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true,limit :"50mb"}));
app.use(bodyParser.json({ limit: '50mb' })); 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.html" );
})
 
//文件上传相关
app.post('/file',function(req, res) {
   var form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = 'utf-8';
  //设置文件存储路劲
  form.uploadDir = './tmplFile';
  form.parse(req, function (err, fields, files) {
   try {
     const content=fields.content;
     var inputFile = files.file;
     console.log(content);
     //console.log(inputFile.originalFilename);
     if(inputFile){
       inputFile.forEach(item => {
           var uploadedPath = item.path;
           var newPath = form.uploadDir + "/" + item.originalFilename;
           //同步重命名文件名 fs.renameSync(oldPath, newPath)
           fs.renameSync(uploadedPath, newPath);
       });
     }
     res.redirect('/');
     //读取数据后 删除文件
     // fs.unlink(newPath, function () {
     //   console.log("删除上传文件");
     // })
   } catch (err) {
     console.log(err);
     res.redirect('/public/error.html');
   };
 });
})

app.post('/file64',function(req, res) {
console.log(req.rawBody);
  var imgData = req.body.imgfiles;
  console.log(imgData);  
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  console.log(base64Data);  
  const creatuuid= uuid.v1();
  var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("./tmplFile/"+creatuuid+".png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("保存成功！");
        }

    });
});




var server = app.listen(8084, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
