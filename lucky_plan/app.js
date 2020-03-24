var express = require('express')
var router = require('./route.js')
var bodyParser = require('body-parser')
 
var app = express()
 
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/public/" + "index.html" );
 });
 
 
// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false,limit :"50mb"}))
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))
 
// 把路由容器挂载到 app 服务中
app.use(router)
 
var server=app.listen(8084, function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
 
module.exports = app;