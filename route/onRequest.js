var http=require("http");
var url=require("url");

function start(route){
  function onRequest(request,response){
    var pathname=url.parse(request.url).pathname;
    console.log("request for"+pathname+"received!");
    //路由跳转
    route(pathname);
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("hello "+pathname);
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("server started.");
}
exports.start=start;
