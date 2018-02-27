var http = require('http');
var url = require('url');
var router = require('./12.27router2');
http.createServer(function(req,res){
    //writeHead 需要加返回的响应码
    res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
    if(req.url == '/favicon.ico'){
        res.end();
    }else{
        //parse 返回一个对象 关于url
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace(/\//,'');
        router[pathname](req,res);
        res.end();
    }
}).listen(3001,function(err){
    console.log("端口号是："+3001);
})