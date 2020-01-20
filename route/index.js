var onRequest=require("./onRequest.js");
var route=require("./route.js");

onRequest.start(route.route);
console.log("index end");
