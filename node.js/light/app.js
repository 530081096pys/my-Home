var light = require('./light');
var query = require("./query");
var body = require("./post");
var aa = require("./abc");
var cookie = require('./cookie');

var app=light();

app.use(query());
app.use(body());
app.use(aa());
app.use(cookie("pengyu"));


app.listen();

var aaa="zhangsan";

app.get("/login",function (req,res) {
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("登录页");
})

app.get("/",function(req,res,next){
    res.sendFile("abc/1.html");
    // if(aaa == "zhangsan"){
    //     console.log('zhangsan');
    //     next();
    // }else{
    //     res.redirect("/login");
    //     res.end();
    // }
    // res.end("1");
})

app.get("/ab",function(req,res,next){
    res.end("abc");
})

app.get("/ccc",function(req,res,next){
    res.end("ccc");
})

app.get('/ejs',function(req,res){
    res.render("aa.html",{name:'zhangsan11'});
})

