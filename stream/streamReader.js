var fs = require('fs');
var data='';
//创建可读流
var readerStream=fs.createReadStream('input.txt');
//设置编码
readerStream.setEncoding('UTF-8');
//处理流时间
readerStream.on('data',function(msg){
   data+=msg;
});

//结尾的时候触发
readerStream.on('end',function(){
   console.log(data)
});
//错误的时候触发
readerStream.on('error',function(err){
   console.log(err.stack);
});

console.log("over");
