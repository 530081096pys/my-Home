#为梦想灼伤了自己 也不要平庸的喘息

##路由
MVC：前后台分离
MVC:前端框架的架构
  h5+c3 == 对图像操作 对音频视频操作  响应式
  h5+c3 移动端适配问题
   angular 
    
   react 
    
   vue{
    m  data   v #root  c  new Vue 路由
    前台的路由是用来确定请求和**组件**之间的关系，实现单页面的应用 spa}
    
  多页面 服务器-相应- 新的页面
  
 1.接收用户的请求
 2.分析用户请求
 3.根据请求，获取相应的资源
 4.对资源来进行解析
 5.解析完成以后，返回给服务器
 6.服务器接收后，返回给客户端
 
 
 vue：
 1.接收请求
 2.分析用户请求
 3.找到用户数据
 4返回给浏览器 
 
 单页面的应用 ：
  ajax ： 
  跨域：jsonP script标签对实现跨域  代理
  
  ###vue-router 原理
  return false = e.preventDefault
  
  var url = this.getAttribute('href')
  
  ajax 兼容 IE7
  
  既能用户体验友好，又能对爬虫友好 又能记录当前访问标识 =》 锚链接
  
  http:// 用户名：密码@主机 www.baidu/路径a/b
  ？id=10查询字符串#one 锚链接
  
  加锚链接 哈希值  不会发起请求 地址栏有变化！！
  
  
  ##1.2
  
  1.对应的场合对应的技术
  2 原生的开发方式 淘汰
  3 B/S 代替 C/S 混合型应用越来越多
  4 process 思维导图在线版 
  
  摩尔定律 硬件每十八个月升级一次，否则产品价格会降低一半  和半导体有关 既可以导电，又可以不导 硅
  
  安迪比尔定律 
  硬件  软件    
   
   基因决定定律  学习->改变基因
   
   webapp 不能调用设备的一些功能
   
   没有原生的运行速度快  但是开发速度快 易于维护 容易下载 
   
   混合型App 各干各的  原生调用能力 wedApp 
   原生10%  Web手段 90%  
   嵌套一个浏览器环境  webview
   
   h5+cs3  实现原生窗口的切换
   
   vh vw 把窗口设置为100份 1代表百分之一 100百分之一百 正好一样 原生窗口开发的动画
   
   ###原生路由##
   
   h5+c3+js 放到原生的哪个组件？
   **webview**
   解释场合
   利用原生JS 实现
   
   vue 按照自己的需求找到想要拥的内容（组件）
   
   1引入 vue-router.js
   2 指定视图出现位置 router-view
   3 指定跳转的的地址 设置a连接 href=#/
   4 在new Vue里面配置路由
   5 设置路由本身  new Vuerouter({})有很多配置
   6 一一对应的关系 请求路径 和组件之间的关系
   7 **组件**
   
   ##实操
   routers是个数组
   {path:"/",component:index}
   
   table :
   border-colla
   
   fetch("/fetch").then(function(e){
            return e.json();
   }).then(function(){})
   
   
   FormData()表单数据
   enctype
   post 头信息 headers:{content-type}
   
   数据组合：str = 'name='+this.name+'&'
   
   req.params.id 获得ID
   
   this.$route.params.id
   
   res.send(e tostring)
   
   单页面应用：能够让基于 B/S架构的软件 像C/S架构一样操作  **不跳转**
      
    