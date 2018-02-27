var light=require("ueklight");
var router=light.Router();
var mysql = require('./mysql');
var md5 = require('./md5')
router.get("/",function(req,res){
    res.render("index.html");
});

//查找
router.get('/fetch',function(req,res){
    setTimeout(function () {
        mysql.query("select * from classes",function (err,result){
            if(err){
                res.end();
            }else{
                console.log(result);
                res.send(JSON.stringify(result));
            }
        })
    },1000)
});

//删除
router.get('/del/:id',function(req,res){
    var id = req.params.id;
    setTimeout(function () {
        mysql.query(`delete from classes where id=${id}`,function (err,result) {
            if(err){
                res.end();
            }else{
                res.send("ok");
            }
        })
    },1000)

});

//添加
router.get('/add',function (req,res) {
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
   setTimeout(function () {
       mysql.query(`insert into classes (name,age,sex) values ('${name}','${age}','${sex}')`,function (err,result) {
           if(err){
               res.end();
           }else{
               res.send('ok');
           }
       })
   },1000)
});

//修改
router.get('/edit/:id',function (req,res) {
    var id = req.params.id;
    mysql.query(`select * from classes where id='${id}'`,function (err,result) {
        if(err){
            res.end();
        }else{
            res.send(JSON.stringify(result));
        }
    })
})

router.get('/editCon/:id',function(req,res){
    var id = req.params.id;
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
    mysql.query(`update classes set name='${name}',age='${age}',sex='${sex}' where id='${id}'`,function (err,result) {
        if(err){
            res.end();
        }else{
            res.send('ok');
        }
    })
})

//登录
router.get('/save',function(req,res){
    var user = req.query.user;
    var pass = md5(req.query.pass);
    mysql.query(`select * from admin where user='${user}' and pass='${pass}'`,function (err,result) {
        if(err){
            obj={code:'',state:'err'};
            res.send(JSON.stringify(obj))
        }else{
            if(result.length > 0){
                obj={code:md5(user),state:'ok'};
                res.send(JSON.stringify(obj));
            }else{
                obj={code:'',state:'err'};
                res.send(JSON.stringify(obj))
            }
        }
    })
});

//注册 -- 检查用户名是否存在
router.get('/check',function(req,res){
    var user = req.query.user;
    mysql.query(`select user from admin where user='${user}'`,function(err,result){
        if(err){
            res.end('err');
        }else{
            if(result.length > 0 ){
                res.end('err');
            }else if(result.length ==0){
                res.end('ok');
            }
        }
    })
});

//注册
router.get('/addUser',function(req,res){
    var user = req.query.user;
    var pass = md5(req.query.pass);
    mysql.query(`insert into admin (user,pass) values ('${user}','${pass}')`,function(err,result){
        if(err){
            res.send('err');
        }else{
            if(result.affectedRows>0){
                res.send('ok');
            }else{
                res.send('err');
            }
        }
    })
})


