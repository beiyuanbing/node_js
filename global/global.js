//当前执行文件的路径，绝对路径
console.log(__filename);
//当前执行文件的脚本目录路径
console.log(__dirname);
//定时器
function printHello(){
   console.log("hello");
}
setTimeout(printHello,2000);
//清除定时器
function printCell(){
   console.log("cell");
} 
var t=setTimeout(printCell,2000);
//清除
clearTimeout(t);
//设置间隔执行,清除的话使用命令cleanInterval(t)
var t1=setInterval(printCell,2000);
setTimeout(function(){
  clearInterval(t1);
},5000);
//增加基础信息
//输出到终端
process.stdout.write("hello 111");
//获取文件的参数，第一个是node，第二个当前脚本文件名，其余是参数
process.argv.forEach(function(val,index,array){
 console.log(index+":"+val);
})
//执行的路径
console.log(process.execPath);
//获取平台的信息
console.log(process.platform);
//获取当前pid
console.log(process.pid);
//获取node的版本
console.log(process.versions);
//获取当前执行的工作目录
console.log(process.cwd());
//process为当前进程的状态对象，exit 退出时候出发
process.on('exit',function(code){
   setTimeout(function(){
    console.log("改代码不会执行");
   },0);
  console.log("退出码:"+code);
})
//退出前调用
process.on('beforeExit',function(code){
  console.log("退出前执行了");
  console.log("退出前:"+code);
})
console.log("程序结束了");
