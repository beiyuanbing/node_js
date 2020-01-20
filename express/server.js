var express = require('express');
var app = express();
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
})

var server = app.listen(8084, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
