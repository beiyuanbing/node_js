const util=require("util");
var test=require("./test.js");
var count=require("count");
count.count("index");
async function fn(){
  return 'helloworld';
}

const callback=util.callbackify(fn);

callback((err,ret)=>{console.log(ret);});
