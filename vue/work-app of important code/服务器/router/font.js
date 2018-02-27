var light=require("ueklight");
var router=light.Router();
var mysql = require("./mysql");
var md5 = require('./md5');

/*前台页面登录*/
router.get('/',function(req,res){
    res.render('findex.html',{});
})

/*新闻标题获取*/
router.get('/api/getNews',function(req,res){
    var page = req.query.page;
    var num = 10;
    var nums = page * num;
    mysql.query(`select * from news limit ${nums},${num}`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else{
                res.end('err')
            }
        }
    })
});

/*新闻内容获取*/
router.get('/api/conShow',function(req,res){
    var nid = req.query.nid;
    mysql.query(`select * from news where nid='${nid}'`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else{
                res.end('fail');
            }
        }
    })
});

/*用户获取*/
router.get('/api/fuserShow',function(req,res){
    mysql.query(`select * from user`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result));
            }else{
                res.end('fail');
            }
        }
    })
});

/*日志用户获取*/
router.get('/api/getUser',function(req,res){
    var pid = req.query.pid;
    mysql.query(`select * from user where pid='${pid}'`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.length>0){
                for(var i = 0;i<result.length;i++){
                    result[i].style = {};
                }
                res.end(JSON.stringify(result));
            }else{
                res.end('err');
            }
        }
    })
});

/*前台登录*/
router.get('/api/Flogin',function(req,res){
    var phone = req.query.phone;
    var pass = md5(req.query.pass);
    mysql.query(`select * from user where phone='${phone}' and upass='${pass}'`,function(err,result){
        if(err){
            res.end(JSON.stringify({message:'fail',data:{}}))
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result));
            }else{
                res.end(JSON.stringify({message:'fail',data:{}}))
            }
        }
    })
});

/*发送日志*/
router.get('/api/addLogs',function(req,res){
    var uid = req.query.uid;
    var sender = req.query.sender;
    var title = req.query.title;
    var con = req.query.con;
    mysql.query(`insert into logs (uid1,uid2,title,con) values ('${sender}','${uid}','${title}','${con}')`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('fail')
            }
        }
    })
});

/*查看日志 发送*/
router.get('/api/getLogs',function(req,res){
    var uid1 = req.query.sender;
    mysql.query(`select logs.*,user.uname from logs,user where uid1='${uid1}' and logs.uid2=user.uid`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            res.end(JSON.stringify(result));
        }
    })
});

/*查看日志 接收*/
router.get('/api/getLogsR',function(req,res){
   var uid2 = req.query.sender;
   mysql.query(`select logs.*,user.uname from logs,user where uid2='${uid2}' and logs.uid1=user.uid`,function(err,result){
       if(err){
           res.end('err')
       }else{
           if(result.length>0){
               res.end(JSON.stringify(result));
           }else{
               res.end('fail');
           }
       }
   })
});

/*用户修改密码*/
router.get('/api/userPass',function(req,res){
    var opass = md5(req.query.opass);
    var npass =md5(req.query.npass);
    var uid = req.query.uid;
    mysql.query(`select * from user where uid='${uid}' and upass='${opass}'`,function(err,result){
        if(err){
            res.end('数据库连接失败')
        }else{
            if(result.length>0){
                mysql.query(`update user set upass='${npass}'`,function(err,result){
                    if(err){
                        res.end('连接数据库失败')
                    }else{
                        if(result.affectedRows>0){
                            res.end('修改成功')
                        }else{
                            res.end('修改失败，啥毛病我也不几道..')
                        }
                    }
                })
            }else{
                res.end('旧密码错误');
            }
        }
    })
});

/*注册*/
router.get('/api/regF',function(req,res){
    var phone = req.query.phone;
    var pass = md5(req.query.pass);
    mysql.query(`insert into user (phone,upass) values ('${phone}','${pass}')`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.affectedRows>0){
                res.end('ok');
            }else{
                res.end('fail')
            }
        }
    })
});

/*注册检查 用户名*/
router.get('/api/creg',function(req,res){
    var phone = req.query.phone;
    console.log(phone);
    mysql.query(`select * from user where phone='${phone}'`,function(err,result){
        if(err){
            console.log(1);
            res.end('fail')
        }else{
            if(result.length>0){
                console.log(2)
                res.end('again')
            }else{
                console.log(3)
                res.end('ok')
            }
        }
    })
})