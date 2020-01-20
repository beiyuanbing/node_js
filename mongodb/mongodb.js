var mongoClient=require("mongodb").MongoClient;
var url="mongodb://admin:123456@localhost:27017/runoob?authSource=admin";

mongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology:true}, function(err, db) {
  if (err) throw err;
  //console.log("数据库已创建!");
  var dbase=db.db("runoob");
  //创建表
  //dbase.createCollection('user',function(err,res){
  //  if(err) throw err;
  //  console.log("创建集合");
 // });
  //插入数据
 //var myColOpt={name:"你好嘢",url:"ssss"};  
 // dbase.collection("user").insertOne(myColOpt,function(err,res){
  //if(err) throw err;
   //console.log("插入成功");
   //db.close();
 //});
  dbase.collection("user").find({}).toArray(function(err,result){
    if(err) throw err;
    console.log(result);
   
  });
var whereStr={"name":"你好嘢"};
 dbase.collection("user").find(whereStr).toArray(function(err,result){
     if(err) throw err;
     console.log(result);
   });
  //更新数据部分
  var updateWhereStr={"name":'你好嘢'};
  var updateSetStr={$set:{"url":"www.baidu.com"}};
  dbase.collection("user").updateOne(updateWhereStr,updateSetStr,function(err,res){
 if(err) throw err;
 console.log("更新成功");
 db.close();
});

});
