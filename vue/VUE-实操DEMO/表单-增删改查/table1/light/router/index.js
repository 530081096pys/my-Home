var light=require("ueklight");
var mysql = require('./mysql');
var md5 = require('./md5');
var router=light.Router();
router.get("/",function(req,res){
    res.render("index.html",{});
});

/*查询数据*/
router.get('/query',function(req,res){
    mysql.query(`select * from classes`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else{
                res.end('fail')
            }
        }
    })
});

/*添加数据*/
router.get('/add',function(req,res){
    var name = req.query.name;
    var sex = req.query.sex;
    var age = req.query.age;
    mysql.query(`insert into classes (name,sex,age) values ('${name}','${sex}','${age}')`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }
        }
    })
});

/*删除数据*/
router.get('/del',function(req,res){
    var id = req.query.id;
    mysql.query(`delete from classes where id='${id}'`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.affectedRows>0){
                res.end('ok');
            }else{
                res.end('fail');
            }
        }
    })
});

/*获取编辑数据*/
router.get('/queryEdit',function(req,res){
    var id = req.query.id;
    mysql.query(`select * from classes where id='${id}'`,function(err,result){
        if(err){
            res.end('fail');
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result));
            }else{
                res.end('fail')
            }
        }
    })
});

/*编辑数据*/
router.get('/edit',function(req,res){
    var name = req.query.name;
    var id = req.query.id;
    var age = req.query.age;
    var sex = req.query.sex;
    mysql.query(`update classes set name='${name}',age='${age}',sex='${sex}' where id='${id}'`,function(err,result){
        if(err){
            res.end('fail');
        }else{
            if(result.affectedRows>0){
                res.end('ok');
            }else{
                res.end('fail');
            }
        }
    })
});

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