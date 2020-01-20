function execute(innerFunction,value){
 innerFunction(value);
}
execute(function(word){console.log(word);},"hello");
