const count={};
exports.count = function(name){
  if(count[name]){
    count[name]++;
  }else{
    count[name]=1;
  }
console.log(name+"被访问了"+count[name]+"次");
};
