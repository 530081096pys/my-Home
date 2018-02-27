var http = require('http');
var User = require('./12.26user');
var teacher = require('./12.26teacher');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    if(req.url != "/favicon.ico"){
        teach = new teacher('lisi',1,20);
        teach.enter();
        teach.teach(res);
        res.end();
    }
}).listen(8886,function(){
    console.log('成功开启端口：'+8886);
})