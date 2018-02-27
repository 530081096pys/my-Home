var http = require('http');
var config = require('./config.js');
var path = require('path');
var fs = require('fs');

class light{
    constructor(){
        this.getinfo=[];
        this.postinfo=[];
        this.rootUrl = process.cwd();
        this.useinfo = [];
    }
    listen(port,fn){
        if(arguments.length == 0){
            var port = config.port;
            var fn = function(){
                console.log(port);
            }
        }else if(arguments.length == 1){
            if(typeof port =="number"){
                var port = port;
                var fn = function () {
                    console.log(port);
                }
            }else if(typeof port == "function"){
                var fn = port;
                var port = config.port;
            }
        }else if(arguments.length ==2){
            var port = port;
            var fn = fn;
        }
        this.port = port;
        http.createServer((req,res)=>{
            var method = req.method;
            console.log(1);
            this.run(method,req,res);
        }).listen(port,function(){
            if(fn){
                fn();
            }
        })
    }

    run(type,req,res){
        var url = req.url;
        if(url == '/favicon.ico'){
            res.end();
        }else{
            //队列，保证中间件加载完毕后执行下一步
            new Promise((reslove,reject)=>{
                var num = 0;
                if(this.useinfo.length == 0){
                    var num = -1;
                    reslove();
                }
                for(var i = 0 ;i<this.useinfo.length;i++){
                    // console.log(this.useinfo.length,111)
                    new Promise((reslove1,reject1)=>{
                        this.useinfo[i](req,res,reslove1);
                    }).then(()=>{
                        num ++ ;
                        if(num == i){
                            reslove();
                        }
                    })
                }
            }).then(()=>{
                this.extend(req,res);
                this.request(req,res,type,url);
            })
        }
    }
    request(req,res,type,url){
        res.sendState="ok";
        if(type =='GET'){
            var arr = this.getinfo
        }else if(type == "POST"){
            var arr = this.postinfo
        }
        var flag = true;
        for(var i = 0;i<arr.length;i++){
            var reg = eval(arr[i].url);
            if(reg.test(url)){
                this.current = i;
                flag = false;
                req.params = {};
                var result = reg.exec(url);
                for(var j = 0; j < result.length;j++){
                    req.params[arr[i].attr[j]] = result[j+1];
                }
                arr[i].callback(req, res,()=>{
                    this.next(req,res);
                });
                break;
            }
        }
        if(flag){
            res.end('err');
        }
    }

    next(req,res){
        var nextIndex=this.current + 1;
        // console.log(nextIndex);
        var nextInfo=this.getinfo[nextIndex];
        res.writeHead(302,{location:nextInfo.originUrl});
        res.end();
    }

    get(url,fn){
        this.saveinfo(url,fn,'get')
    }
    post(url,fn){
        this.saveinfo(url,fn,'post')
    }
    all(url,fn){
        this.saveinfo(url,fn,'get')
        this.saveinfo(url,fn,'post')
    }

    saveinfo(url,fn,type){
        var infoarr = type =='get'?this.getinfo:this.postinfo;
        var arr = url.match(/:[^\\/]+/g)||[];
        arr = arr.map(function (itme) {
            return itme.substr(1);
        });
        var str = url.replace(/:[^\/]+/g,"([^\/]+)");
        str = str.replace(/\//g,'\\/');
        var str = "/^"+str+"[\\/]?(?:\\/?.*)$/";
        var obj = {};
        obj.url = str;
        obj.callback=fn;
        obj.originUrl = url;
        obj.attr = arr;
        infoarr.push(obj);
    }
    extend(req,res){
        res.redirect = function(url){
            res.writeHead(302,{
                "location":url
            });

        }
        res.send = function(message){
            res.setHeader("content-type","text/html;charset=utf-8");
            res.end(message);
        }
        res.sendfile = (url)=>{
            var fullpath = path.join(this.rootUrl,url);
            fs.stat(fullpath,function (err) {
                console.log(fullpath);
                if(err){
                    res.end('111');
                }else{
                    fs.createReadStream(fullpath).pipe(res);
                }
            })
        }
    }
    use(fn){
        this.useinfo.push(fn);
    }
}
module.exports=function () {
    return new light();
}
