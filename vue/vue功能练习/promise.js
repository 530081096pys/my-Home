new Promise(function(reslove,reject){
    setTimeout(function () {
        console.log(1);
        reslove();
    },3000)
}).then(function(){
    setTimeout(function () {
        console.log(2)
    },2000)
})
/*
* npm install async 因为promise低版本不兼容
*
* */
async.series([
    function (next){
       console.log(1);
       next();
    },
    function(next){
        console.log(2);
        next();
    }
],function () {
    console.log('end');
})