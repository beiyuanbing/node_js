//引入 events模块
var events=require('events');
//创建 eventEmitter对象
var eventEmitter=new events.EventEmitter();
//创建handler
var connectHandler=function connected(){
	console.log('连接成功');
	//触发data_received事件
	eventEmitter.emit('data_received');
}
//绑定事件的处理器
eventEmitter.on('connection',connectHandler);
//received的事件绑定
eventEmitter.on('data_received',function(){
  console.log('数据接收成功');
});

//此处触发connection事件
eventEmitter.emit('connection');
console.log('执行完毕');
