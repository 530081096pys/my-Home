var light=require("ueklight");
var router=light.Router();
var mysql = require("./mysql");
var md5 = require('./md5');

/*部门添加*/
router.get('/api/addPart',function(req,res){
    var pname = req.query.pname;
    var parentId = req.query.parentId;
    mysql.query(`insert into part (pname,parentid) values ('${pname}','${parentId}')`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.affectedRows>0){
                var num = result.insertId.toString();
                res.end(num);
            }else{
                res.end('fail')
            }
        }
    })
});

/*部门添加 数据获取*/
router.get('/api/addPartShow',function(req,res){
    mysql.query(`select * from part`,function(err,result){
        if(err){
            var obj = {message:'fail',data:{}};
            res.send(JSON.stringify(obj))
        }else{
            if(result.length>0){
                var obj ={message:'ok',data:result};
                res.send(JSON.stringify(obj));
            }else{
                var obj = {message:'fail',data:{}};
                res.send(JSON.stringify(obj))
            }
        }
    })
});

/*部门内容获取*/
router.get('/api/partShow',function(req,res){
    mysql.query(`select * from part`,function(err,result){
        if(err){
            var obj = {message:'err',data:{}};
            res.end(JSON.stringify(obj));
        }else{
            if(result.length>0){
                var obj = {message:'ok',data:result}
                res.end(JSON.stringify(obj));
            }else{
                var obj = {message:'err',data:{}};
                res.end(JSON.stringify(obj));
            }
        }
    })
});

/*部门信息删除*/
router.get('/api/delPart',function(req,res){
    var pid = req.query.pid;
    var parentid = req.query.parentid;
    mysql.query(`select * from part where parentid='${pid}'`,function(err,result){
        if(err){
            res.end('fail');
        }else{
            if(result.length>0){
                res.end('haveSon')
            }else{
                mysql.query(`delete from part where pid='${pid}'`,function(err,result){
                    if(err){
                        res.end('err');
                    }else{
                        if(result.affectedRows>0){
                            res.end('ok');
                        }else{
                            res.end('fail');
                        }
                    }
                })
            }
        }
    })
});

/*部门信息修改*/
router.get('/api/editPart',function(req,res){
    var pname = req.query.pname;
    var parentid =req.query.parentId;
    var pid = req.query.pid;
    mysql.query(`update part set pname='${pname}',parentid='${parentid}' where pid='${pid}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok');
            }else{
                res.end('err');
            }
        }
    })
})