function user(name,id,age){
    this.name = name;
    this.id = id;
    this.age = age;
    this.enter = function(){
        console.log(this.name + '进入图书馆');
    }
}
module.exports = user;