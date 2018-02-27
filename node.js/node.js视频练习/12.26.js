var http = require('http');
var fun = require('./12.26.1');
http.createServer(function(req,res){
    console.log(req.url);
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    if(req.url == "/favicon.ico"){
        res.end();
    }else{
        //用字符串形式 可以在之前赋值变量代替
        fun['fun2'](res);
        res.end();
    }
}).listen(8887,function(){
    console.log('成功开启端口：'+8887);
});

//函数本地调用  函数外部调用不能直接使用函数名或者变量名
function fun1(res){
    res.write("Hello,我是FUN1");
}