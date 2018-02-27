var light=require("ueklight");
var router=light.Router();
var mysql = require("./mysql");
var md5 = require('./md5');
var xlsx = require('node-xlsx');

/*添加用户*/
router.get('/api/addUser',function(req,res){
   var uname = req.query.uname;
   var upass = md5('123456');
   var phone = req.query.phone;
   var pid = req.query.pid;

    mysql.query(`replace into user (uname,upass,phone,photo,pid) values ('${uname}','${upass}','${phone}','','${pid}')`,function(err,result){
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
   /*mysql.query(`select * from user where phone='${phone}'`,function(err,result1){
       if(err){
           res.end('fail')
       }else{
           if(result1.length>0){
               res.end('以重复');
           }else{
               mysql.query(`insert into user (uname,upass,phone,photo,pid) values ('${uname}','${upass}','${phone}','','${pid}')`,function(err,result){
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
           }
       }
   })*/
});

/*删除用户*/
router.get('/api/delUser',function(req,res){
    var uid =req.query.uid;
    console.log(uid);
    mysql.query(`delete from user where uid='${uid}'`,function(err,result){
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

/*展示用户*/
router.get('/api/userShow',function(req,res){
    var pid = req.query.pid;
    mysql.query(`select user.*,part.pname from user,part where user.pid='${pid}' and user.pid=part.pid`,function(err,result){
        if(err){
            var obj ={message:'fail',data:{}};
            res.send(JSON.stringify(obj));
        }else{
            if(result.length>0){
                var obj = {message:'ok',data:result};
                res.send(JSON.stringify(obj));
            }else{
                var obj ={message:'fail',data:result};
                res.send(JSON.stringify(obj));
            }
        }
    })
});

/*用户 部门获取*/
router.get('/api/userPart',function(req,res){
    var pid = req.query.pid;
    mysql.query(`select * from part where parentid='${pid}'`,function(err,result){
        if(err){
            var obj={}
            res.end(JSON.stringify(obj))
        }else{
            for(var i =0;i<result.length;i++){
                (function(i){
                    mysql.query("select * from part where parentid="+result[i].pid,function(err,result1){
                        if(err){
                            res.end('fail')
                        }else{
                            if(result1.length>0){
                                result[i].son=true;
                                result[i].style={};
                            }else{
                                result[i].son = false;
                                result[i].style={};
                            }
                            if(i==result.length-1){
                                res.end(JSON.stringify(result));
                            }
                        }
                    })
                })(i)
            }
        }
    })
});

/*用户批量上传*/
router.post('/api/upUser',function(req,res){
    var obj;
    obj = xlsx.parse(res.upInfo.path)
    var datas = obj[0].data;
    mysql.query(`select * from part`,function(err,result){
        if(err){
            res.end('fail')
        }else{
            if(result.length>0){
                for(var i=1;i<datas.length;i++){
                    var uname = datas[i][0];
                    var phone = datas[i][1];
                    var pname = datas[i][2];
                    var pid = 1010;
                    for(var j =0;j<result.length;j++){
                        if(pname == result[j].pname){
                            pid = result[j].pid;
                            var flag =true;
                            for(var k=0;k<result.length;k++){
                                if(pid == result[k].parentid){
                                    res.end(pname+'非子部门');
                                    break;
                                }
                                if(k==result.length-1 && pid!= result[result.length-1].parentid ){
                                    var upass =md5('123456')
                                    mysql.query(`replace into user (uname,upass,phone,photo,pid) values ('${uname}','${upass}','${phone}','','${pid}')`,function(err,result1){
                                        if(err){
                                            res.end('fail')
                                        }else{
                                            if(result1.affectedRows>0){
                                                res.end('批量上传成功')
                                            }else{
                                                res.end('fail')
                                            }
                                        }
                                    })
                                }
                            }
                        }
                        if(j == result.length - 1 && pid==1010){
                            res.end('输入部门有误,错误部门是'+pname)
                        }
                    }
                }
            }else{
                res.end('fail');
            }
        }
    })


});