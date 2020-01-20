// 载入http模块
var http=require('http');
function serverSetting(request,response){
// http头部设置
   response.writeHead(200,{'Content-Type':'text/plain'});
   response.end('hello world');
}
http.createServer(serverSetting).listen(8888);
console.log('server run http://127.0.0.1:8888/');
