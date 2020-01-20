var fs = require('fs');
var data='';
//创建写入流
var writerStream=fs.createWriteStream('output.txt');
//设置编码
writerStream.write('珍猪你好吗','UTF-8');
//设置文件尾
writerStream.end();
//完成时候触发
writerStream.on('finish',function(){
   console.log('写入完成')
});
//错误的时候触发
writerStream.on('error',function(err){
   console.log(err.stack);
});

console.log("over");
