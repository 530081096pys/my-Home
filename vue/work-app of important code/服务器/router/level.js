var light = require('ueklight');
var router = light.Router();
var mysql = require("./mysql");

/*权限添加*/
router.get("/api/addLevel",function(req,res){
    var lname = req.query.lname;
    var lnum = req.query.lnum;
    mysql.query(`insert into level (lname,lnum) values ('${lname}','${lnum}')`,function (err,result) {
        if(err){
            res.end("err");
        }else{
            if(result.affectedRows>0){
                res.end('ok');
            }else{
                res.end('err');
            }
        }
    })
});

/*权限展示*/
router.get("/api/levelShow",function(req,res){
    mysql.query(`select * from level`,function(err,result){
        if(err){
            res.end("err");
        }else{
            res.send(JSON.stringify(result));
        }
    })
});

/*权限编辑查看*/
router.get('/api/editLevel/:id',function(req,res){
    var lid = req.params.id;
    mysql.query(`select * from level where lid='${lid}'`,function(err,result){
        if(err){
            var obj = {message:"fail",data:{}};
            res.send(JSON.stringify(obj));
        }else{
            if(result.length>0){
                var obj = {message:"success",data:result};
                res.send(JSON.stringify(obj));
            }else{
                var obj = {message:"fail",data:{}};
                res.send(JSON.stringify(obj));
            }
        }
    })
});

/*权限编辑修改*/
router.get('/api/editLevelCon',function (req,res) {
    var lid = req.query.lid;
    var lname = req.query.lname;
    var lnum = req.query.lnum;
    mysql.query(`update level set lname='${lname}',lnum='${lnum}' where lid='${lid}'`,function(err,result){
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

/*权限删除*/
router.get("/api/delLevel",function(req,res){
    var lid = req.query.lid;
    mysql.query(`delete from level where lid='${lid}'`,function(err,result){
        if(err){
            res.end('fail');
        }else{
            if(result.affectedRows>0){
                res.end('ok');
            }else{
                res.end('fail');
            }
        }
    });
})