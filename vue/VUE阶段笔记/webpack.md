##webpack
插件 对本身的增强 LOADERS 加载项 

webpack-test
src:开发的源码 JS CSS IMG  
index.html
dist 整合之后合并而来 

如何把一大堆JS合并到一起， grunt  gulp  webpack 

1.安装全局 或者 本地 本目录
2.合并的时候，要有一个入口文件，用来指定任务 main.js 
   require src/js/1.js src/js/2.js 
   webpack main.js ./dist/a.js
3.以防出错，先写好配置文件  
   webpack.config.js 
           var path = require(path);
           module.exports ={ 
                entry:'./main.js',
                output:{ 
                     filename:'abc.js'
                }
           }
           运行webpack

**后缀名 map 压缩完只有一行代码，map记录没有压缩时的行数位置，得到错误行数。**


4.入口 
  entry 设置为对象  
    entyr:{ 
        one:"./src/js/1.js",
        two:"./src/js/2.js",
    }
    filname: '[name].js'  会变成键的名字 one two

5.模块 转化babel时用的模块

解析CSS css-loader+style-loader

模块化  一张图片也当成一个模块来处理

安装模块


6.创建 packjson  
   npm init
   
   --save 生产依赖  --save-dev 开发依赖 

bower 包管理工具  下载浏览器的框架 bower install jquery

##重要语法
require 语法   模块化的开发方式趋于一致

import a，{aa,bb} from "./src/js/1.js" 引入文件赋值给a

输出 export default = a; 返回a的值 默认返回
export { aa,bb}返回其他值   **默认值可以随便一个变量去接受  大括号里的值 必须变量名一致**

##Teacher notes

import 接受的变量 from 地址
访问的文件要想返回值的话， export default 默认值
多个值 export { 多个值 }

接收到之后，访问默认值  可以用任意变量接收 
访问不是默认值  {变量的名字一致}

start : webpack --watch
npm start  除了start 加 npm run abc

require ./src/css/1.css

##插件
webpack 能力的增强 
Extract-text-
需要引入  引入到配置项

自动引入 
Html webpack 
指定把谁做为模板

#dist 操作
js/main.js
css/styles.css
放到dist 里面分好类

图片  ../img/bd.png;
file loader  配置 
publicPath:'../' 防止路径错误

html loader  对HTMl 进行内部处理
data-src=

开启一个服务器
 模块热替换  webpack=dev-server --save-dev
 独立于四项之外
 
 dev 命令！！ webpack-dev-server  npm run dev
 
 开发  map    
 
 DOMContentLoaded 事件 当HTML结构dom加载完 不等图片
 onload 资源加载完 图片也会加载完才执行
 
 ##流程重演
   1.创建工作目录
   2.创建 dist src webpack.config.js  npm init
   3.index.html 模板文件
   4.npm install webpack --save-dev
   5.配置文件  module.exports = { entry:
              output:{ filename:"./js/[name].js",path:'./dist}
   }    var path = require('path')
   6.入口文件  main.js
   7.cd node modules cd webpack  ls -a  
   8.在packjson写个命令 start:webpack 
   9.插件要引入 注册组件  ./css/style.css
   
   10.服务器
     webpack-dev-server --D
     devServer:{ 
          contentBase:'dist',
          port:8888
     }
     11. netstat -ano | findstr "8888"
         taskkill /f -pid xxxx
   
   12. server : webpack-dev-server  --open  配置项
       npm run server
       
       13.同时 & 
       
       14.压缩 uglifyjsWebpackPlugin  本身就有
       var webpack = require('webpack')
       
       排除 exclude  node-
    15.引入完要注册才能适用
      
    