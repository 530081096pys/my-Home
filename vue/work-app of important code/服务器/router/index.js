var light=require("ueklight");
var router=light.Router();
var mysql = require("./mysql");
var md5 = require('./md5');

/*后台打开*/
router.get('/admin',function(req,res){
    res.render('index.html',{})
})

/*登录验证*/
router.get("/api/checkLogin",function(req,res){
    console.log(1);
    var aname = req.query.user;
    var apass =md5(req.query.pass);
    mysql.query(`select aid,aname,rid from admin where aname='${aname}' and apass='${apass}'`,function (err,result) {
        if(err){
            res.end('fail');
        }else{
            if(result.length>0){
                var obj = {message:'ok',data:result};
                res.end(JSON.stringify(obj));
            }else{
                var obj ={message:'fail',data:{}}
                res.end(JSON.stringify(obj));
            }
        }
    })
});

/*获取管理者数据*/
router.get("/api/show",function(req,res){
    var aid = req.query.aid;
    var rid = req.query.rid;
    if(aid ==1){
        mysql.query("select admin.*,role.rname from admin,role where admin.rid=role.rid",function (err,result) {
            if(err){
                res.end("err");
            }else{
                var obj = {data:result}
                res.end(JSON.stringify(obj));
            }
        })
    }else{
        mysql.query(`select admin.*,role.rname from admin,role where admin.rid=role.rid and admin.aid='${aid}'`,function (err,result) {
            if(err){
                res.end("err");
            }else{
                mysql.query(`select lid from role where rid='${rid}'`,function(err,result1){
                    var obj ={data:result,lids:result1[0]}
                    res.end(JSON.stringify(obj));
                })
            }
        })
    }

});

/*头像上传*/
router.post("/api/upload",function(req,res){
    var PathRel =  res.upInfo.relPath;
    res.send(PathRel);
});

/*添加管理者*/
router.post('/api/api/addManager',function(req,res){
    var aname = req.body.aname;
    var rid = req.body.rid;
    var apass = md5(req.body.apass);
    var photo = req.body.photo;
    mysql.query(`insert into admin (aname,rid,apass,photo) values ('${aname}','${rid}','${apass}','${photo}')`,function(err,result){
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

/*删除管理者*/
router.get('/api/api/delManager',function(req,res){
    var aid = req.query.aid;
    mysql.query(`delete from admin where aid='${aid}'`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('fail')
            }
        }
    })
});

/*修改管理者密码*/
router.get('/api/editPass',function(req,res){
   var old = req.query.old;
   var news = req.query.news;
   var aid = req.query.aid;
   mysql.query(`select apass from admin where aid='${aid}'`,function(err,result){
       if(err){
           res.end('fail');
       }else{
           if(result.length>0){
               var apass = result[0].apass;
               if(md5(old)==apass){
                   var napass = md5(news);
                   mysql.query(`update admin set apass='${napass}' where aid='${aid}'`,function(err,result){
                       if(err){
                           res.end('数据库连接错误');
                       }else{
                           if(result.affectedRows>0){
                               res.end('修改成功');
                           }else{
                               res.end('修改失败');
                           }
                       }
                   })
               }else{
                   res.end('原密码错误')
               }
           }else{
               res.end('fail');
           }
       }
   })
});

/*修改管理者信息*/
router.post('/api/editManager',function(req,res){
    var photo = req.body.photo;
    var aname = req.body.aname;
    var rid = req.body.rid;
    var aid = req.body.aid;
    mysql.query(`update admin set photo='${photo}',aname='${aname}',rid='${rid}' where aid='${aid}'`,function(err,result){
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
})
