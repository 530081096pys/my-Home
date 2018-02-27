
var mysql = require('./mysql');
function access(aid,num,success,errback){
    var sql = `select * from admin,role where admin.rid=role.rid and admin.aid='${aid}' and find_in_set('${num}',role.lid)`;
    mysql.query(sql,function(err,result){
        if(err){
            if(errback){
                errback();
            }
        }else{
            if(result.length>0){
                success();
            }else{
                errback();
            }
        }
    })
};
module.exports=access;
