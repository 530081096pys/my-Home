#Vue
登录 注册

##登录
组件 
头部组件  
template  
main组件  Head + router-view

更改路由   / 对应 main  /的子路由  children
   第一个子容器  / 对应 index
   
   ###导航守卫
   router.beforEach(function(to,from,next){
        next();
   })在路由进入之前 执行的函数
   
   router.afftera
    没有next
    
    befoElement.
   
   单独用 router-beforenty
   
   跳转  this.$router.push('/')
   router.beforeEach(function(to,from,next){
            if(to.paht=='/login' || to.paht=="/reg"){
            next();
            }   else{
              router.push('/login')
            }
   })
   
   
   md5
   crypto 
   var hash = c.createHash md5
   hash.update 123456
   hash.digest hex 
   
   sessionStorage.removeItem('login')
   
   **路由的钩子函数**
   进入之前 beforeEnter()
   如果每一个都要处理  就放在全局
   
   router-beforEach   to  from  next
   //检测是否登录  to.path = login 或者 reg
   直接进
   if()else{登录检测  
       if  sessionStorage.login 
       else router.push /login
   }
   next()
   
   check and pass = '${pass}'
   obj = code:md5 name  state:ok
   
   
   post 方式 
   method post 
   headers content      application
   body:name=+
   
   affectedRows