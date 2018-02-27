var light=require("ueklight");
var router=light.Router();
var mysql = require("./mysql");
var md5 = require('./md5');
var access = require('./access');
var fs=require('fs');
var path = require('path');

/*角色添加*/
router.get("/api/addRole",function (req,res) {
    var rname = req.query.rname;
    var lid = req.query.lid;

    mysql.query(`insert into role (rname,lid) values ('${rname}','${lid}')`,function(err,result){
        if(err){
            res.end('err');
        }else{
            if(result.affectedRows>0){
                res.end("ok");
            }else{
                res.end('err');
            }
        }
    })
});

/*角色展示*/
router.get("/api/roleShow",function(req,res){
    mysql.query(`select * from role `,function(err,result){
        if(err){
            res.end("err");
        }else{
            mysql.query(`select * from level`,function(err,level){
                if(err){
                    res.end("err");
                }else{
                    for(var i =0;i<result.length;i++){
                        /*lids 先将Lid打散成一个数组，然后再次循环对比 与lnum一一对比，将数字替换成名字 再返还给result*/
                        var lids = result[i].lid.split(',');
                        for(var j = 0;j<lids.length;j++){
                            for(var k =0;k<level.length;k++){
                                if(lids[j] == level[k].lnum){
                                    var obj = {lid:level[k].lnum,lname:level[k].lname}
                                    // lids[j] = level[k].lname;
                                    lids[j]= obj;
                                    result[i].level = level;
                                }
                            }
                            result[i].lid = lids;
                        }
                    }
                    res.send(JSON.stringify(result));
                }
            })
        }
    })
});

/*角色删除*/
router.get('/api/delRole',function(req,res){
    var rid = req.query.rid;
    var aid = req.query.aid;
    access(aid,2,function(){
        mysql.query(`select * from admin where rid='${rid}'`,function(err,result){
            if(err){
                res.end('err');
            }else{
                if(result.length>0){
                     for(var i = 0;i<result.length;i++){
                         var photo = result[i].photo;
                         fs.unlinkSync(path.resolve(photo));
                     };
                    var sql = `delete from admin where rid='${rid}'`;
                     mysql.query(sql,function(err,result2){
                         if(err){
                             res.end('err');
                         }else{
                             if(result2.affectedRows>0){
                                 mysql.query(`delete from role where rid='${rid}'`,function(err,result3){
                                     if(err){
                                         res.end('err')
                                     }else{
                                         if(result3.affectedRows>0){
                                             res.end('ok')
                                         }else{
                                             res.end('err')
                                         }
                                     }
                                 })
                             }else{
                                 res.end('err');
                             }
                         }
                     })
                }else{
                    mysql.query(`delete from role where rid='${rid}'`,function(err,result1){
                        if(err){
                            res.end('err')
                        }else{
                            if(result1.affectedRows>0){
                                res.end('ok')
                            }else{
                                res.end('err')
                            }
                        }
                    })
                }
            }
        })
        /*mysql.query(`delete from role where rid='${rid}'`,function(err,result){
            if(err){
                res.end('fail')
            }else{
                if(result.affectedRows>0){
                    res.end('ok');
                }else{
                    res.end('fail')
                }
            }
        })*/
    },function(){
        res.end('fail');
    })

});

/*角色编辑*/
router.get('/api/editRole',function(req,res){
    var rid = req.query.rid;
    var rname = req.query.rname;
    var lid = req.query.lid;
    mysql.query(`update role set rname='${rname}',lid='${lid}' where rid='${rid}'`,function (err,result) {
        if(err){
            res.end('err');
        }else{
            if(result.affectedRows>0){
                res.end('ok');
            }else{
                res.end('err');
            }
        }
    })
});

/*获取角色简单信息*/
router.get('/api/showManager',function(req,res){
    mysql.query(`select rid,rname from role`,function(err,result){
        if(err){
            res.end('err');
        }else{
            res.send(JSON.stringify(result));
        }
    })
});
