####http 协议 无状态的协议
content-type 返回数据的类型以及编码

cookie 登录注册，保存状态的场景

fs.readFile 一次性将文件放入内存 压力大

Last-Modified

toUTCString() 可以斧正闰秒

设置头 

返回请求头信息

var time1 = new Date().getTime()

如果存在且等于 走缓存
res.writeHead (304);
res.end()

Cache-Control : private 只有第一次访问的时候访问服务器，之后缓存
                no-cache 每一次都会请求服务器
                max-age=10  秒计时 时间内走缓存
                
CC 为  null

X-Ua-Compatible 针对IE8 浏览器设置  值是
       IE=edge,chrome=1 强制用高版本内核去解析