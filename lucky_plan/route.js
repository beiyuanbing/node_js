/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */
 
var fs = require('fs')
 
// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')
 
// 1. 创建一个路由容器
var router = express.Router()
var uuid = require('uuid');
var multiparty = require('multiparty');

var formidable = require('formidable')
 
//文件上传相关
router.post('/file',function(req, res) {
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
 
 router.post('/file64',function(req, res) {
 console.log(req.body);
   var imgData = req.body.imgfiles;
   var imgFormat=req.body.imgFormat;
   if(!imgFormat){
       imgFormat="png"
   }
   console.log(imgFormat);
   var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
   const creatuuid= uuid.v1();
   var dataBuffer = Buffer.from(base64Data, 'base64');
     fs.writeFile("./tmplFile/"+creatuuid+"."+imgFormat, dataBuffer, function(err) {
         if(err){
           res.send(err);
         }else{
           res.send("保存成功！");
         }
     });
 });
 
// 3. 把 router 导出
module.exports = router
 
// 这样也不方便
// module.exports = function (app) {
//   app.get('/students', function (req, res) {
//     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
//     // 除了这样来转换之外，也可以通过 data.toString() 的方式
//     fs.readFile('./db.json', 'utf8', function (err, data) {
//       if (err) {
//         return res.status(500).send('Server error.')
//       }
 
//       // 从文件中读取到的数据一定是字符串
//       // 所以这里一定要手动转成对象
//       var students = JSON.parse(data).students
 
//       res.render('index.html', {
//         fruits: [
//           '苹果',
//           '香蕉',
//           '橘子'
//         ],
//         students: students
//       })
//     })
//   })
 
//   app.get('/students/new', function (req, res) {
 
//   })
 
//   app.get('/students/new', function (req, res) {
 
//   })
 
//   app.get('/students/new', function (req, res) {
 
//   })
 
//   app.get('/students/new', function (req, res) {
 
//   })
 
//   app.get('/students/new', function (req, res) {
 
//   })
// }
