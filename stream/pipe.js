var fs=require("fs");
//创建读写流
var readStream=fs.createReadStream("input.txt");
//创建写入流
var writeStream=fs.createWriteStream("outputPipe.txt");
//进行管道的pipe操作
readStream.pipe(writeStream);
//结束执行的打印
console.log("执行结束");

