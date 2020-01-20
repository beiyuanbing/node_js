const mongoClient=require("mongodb").MongoClient;
//配置文件
const config=require("../config/mongoConfig");
//判断有没有用户名
class mongoasyn{
    //单例模式
    static getInstance() {
        if(!mongoasyn.instance){
            mongoasyn.instance=new mongoasyn();
        }
        return mongoasyn.instance;
    }

    //默认初始化执行方法
    constructor() {
        //数据库的连接
        this.dbClient="";
        this.url=this.getUrl();
        //初始化数据库连接
        this.connect();
    }

    getUrl(){
        //获取配置的链接
        if(config.url!=''){
            return config.url+(config.options==''?"":("?"+config.options));
        }
        if(config.username !=''&& config.password !=''){
            return 'mongodb://'+config.username+':'+config.password+'@'+config.address+':'+config.port+(config.options==''?"":("?"+config.options));
        }else {
            return 'mongodb://'+config.address+':'+config.port+(config.options==''?"":("?"+config.options));
        }
    }
    //启动连接
    connect() {
        return new Promise((resolve,reject)=>{
            if(!mongoasyn.dbClient){
                console.log(this.url);
                mongoClient.connect(this.url,{ useNewUrlParser: true,useUnifiedTopology:true}, function(err, client) {
                    if (!err){

                        mongoasyn.dbClient=client.db(config.database!=''?config.database:"");
                        resolve( mongoasyn.dbClient);
                    }else{
                        reject(err);
                    }
                });  
            }else{
                resolve(mongoasyn.dbClient);
            }
        });
    }
    //添加
    add(tableName,json){
        return new Promise((resolve, reject) => {
            this.connect().then(db=>{
                db.collection(tableName).insertOne(json,(err,reuslt)=>{
                    if (err) {
                        reject(err);
                    }
                    resolve(reuslt);
                    return;
                });
            })
        });
    }
    //更新的方法
    update(tableName,condition,dataJson){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).update(condition,{$set:dataJson},(err,result)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                    return;
                })
            });
        });
    }
    //更新单个方法
    updateOne(tableName,condition,dataJson){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).updateOne(condition,{$set:dataJson},(err,result)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                    return;
                })
            });
        });
    }
    //删除的方法
    delete(tableName,condition){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).deleteOne(condition,(err,result)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                    return;
                })
            });
        });
    }
    //查询的方法
    find(tableName,condition){
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let data=db.collection(tableName).find(condition);
                data.toArray((err, result)=>{
                    if(err) reject(err);
                    resolve(result);
                    return;
                });
            });
        });
    } 
    //查询分页的方法
    findPage(tableName,condition,page,pageSize){
        return new Promise((resolve, reject)=>{
            this.connect().then(db => {
                db.collection(tableName).find(condition).count().exec((err,total)=>{
                    if(err) reject(err);
                    let result={  
                        total:total,
                        data: [],
                        page:page,
                        pageSize:pageSize
                    };
                    if(total==0){
                        resolve(result);
                        return;
                    }
                    //接着只查询指定的数据
                    let skip=(page-1<0?0:page-1)*pageSize;
                    db.collection(tableName).find(condition).skip(skip).limit(pageSize).exec((e,res)=>{
                        if(e) reject(e);
                        result.data=res;
                        resolve(result);
                        return;
                    });
                })
            });
        });
    }
}

module.exports =mongoasyn.getInstance();