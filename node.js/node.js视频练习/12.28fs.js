var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
    if(req.url == "/favicon.ico"){
        res.end();
    }else{
        console.log(1);
        res.end();
    }
}).listen(3333,function (err) {
    console.log("端口号是"+3333);
})