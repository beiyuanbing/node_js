var mongoUtil=require("../util/mongoasyn");
function User(){
 var name;
 var url;
 this.setName=function(name){
   this.name=name;
 };
 this.setUrl=function(url){
   this.url=url;
 };
this.add=function(){
  console.log("name:"+this.name+",url:"+this.url);
  var myColData={name:this.name,url:this.url};
  console.log("temp");
  mongoUtil.add("user",myColData);
  console.log("插入完成");  
 }
}
module.exports=User;
