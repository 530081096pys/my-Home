var User = require('./12.26user');
function teacher (name,id,age){
    User.apply(this,[name,id,age]);
    this.teach = function(res){
        res.write(this.name + '讲课');
    };
};
module.exports = teacher;