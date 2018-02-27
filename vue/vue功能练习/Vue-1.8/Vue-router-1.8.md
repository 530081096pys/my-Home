##1.5
cd 项目下 
cd linght 
npm install 

promise:
异步的代码有顺序地执行
 
 fill watch
 
 ##1.8
 历史记录：浏览器 维护数组
 history.pushState({data:10},'标题',地址'/aa') 添进一个状态
 
 window.onpopstate = function(){}
    history.state.path
    前进后退也要有记录
    
##三窗口
router  mode:'history' 默认哈希  一次性加载的东西太多。

两个router 平行放置

vm把窗口整体分为100份

path什么都不写 子路由和父路由会一切写进页面

命名路由 一个路由对应多个组件
共components:{
 left :Left  right:Right
}   name='' 
   
数据库的数据是一条条的，先要把数据组合好

数据解析：parse(){
     var arr = [];
     for(var i in this.menu){
        if(this.menu[i].pid==0){
            var obj =this.menu[i]
            arr.push(obj);
        }else{
            for(var j in arr){
                if(menu[i].pid == arr[j].id){
                if(arr[j].child){
                    arr[j].child.push(this.menu[i])
                }
                }
            }
        }
     }
}
mode history 东西全都没了

md  npm 解析器  markdown-it
地址  中括号名字  小括号地址
||||     UEditor 百度编译器  正则判断，写回车v-html = data  
   将字符串转化为标签
   
动画：一个属性或者样式，连续不断的发生变化，在视觉上呈现出动画的形态

h5  requestAnimationFrame

$({start:0}).animate({start:100},{
        duration:1000,
        step:function(e){ 
           $('div').css('width',e);
        }
})

mode = out-in

    