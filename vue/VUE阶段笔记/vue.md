## VUE

1.概念

框架，必须遵守其规则

m数据 模型v视图c控制器  视图模型分开        m数据，模型v  视图 v 视图m数据，模型

cms内容管理系统 过程化。

2.特征：

双向数据绑定      组件化方式开发

### 3.脏值检测    vue数据劫持  订阅者发布者模式

let data ={

};

object.defineProperty(data,'name',{

​         	enumerable:true,

 		configurable:false,

​		set:function(){

}

​		get:function(){

}

})

#### 4.创建之前 为挂载

 创建时，解析数据  数据有 元素没有

渲染阶段，数据 DOM对象都有

#### 5.html  里面包含标签对的时候

绑定的时候，无法识别，对应指令，v-html=‘html

#### 6.指令

#### v-bind 绑定  ：id  = ‘id’;也可以省略 v-bind 直接 ：id=‘aa’；

注意：加单引号的时候 是字符串！！

#### 7.表达式

大括号里可以写表达式，表达式要有值！语句对应操作，没有返回值。

#### 8.v-if   显示隐藏对应的是插入 

  v-show  元素一直都在

#### 9.  .stop 阻止事件流  修饰符   参数后面加点

#### 10.计算属性：

computed:{

​          sum(){

​			return  this.num1+this.num2

​		}

}

也是属性，是函数类型的计算属性。是属性！！！！

#### 11. style class

#### 12.key 

解决高效服用

### 13.spa

单页应用  局部刷新  只有一页，动态加载组件   哈希

#### 14.

|  模块  |                    功能                    |          需求           |
| :--: | :--------------------------------------: | :-------------------: |
|  登陆  |                                          |     选择身份，理念，LOGO      |
| 管理员  |                    登录                    |        用户名 密码         |
|      |           教师管理：名字，方向，阶段，班级，密码            |    逐条添加 批量EXCEL导入     |
|      |           学生管理：姓名，班级，方向，阶段，密码            |    逐条添加 批量EXCEL导入     |
|      |              班级管理：班级名称、所属方向              | 查询：根据名称、方向。删除：逐条删除，批量 |
|      |                方向管理：方向名称                 |         增删改查          |
|      |              阶段管理：阶段名称、所属方向              |         增删改查          |
|      |                 个人信息：头像                  |         修改密码          |
|      |                                          |                       |
|  教师  | 试题管理：类型、题干、选项、答案、解析、分值、出题人、阶段，（难易2.0上线）：根据类型、出题人、难易程度查看 |                       |
|      |                类型管理：类型名称                 |                       |

#### 15.

|  模块   |    表名     |                    字段                    |
| :---: | :-------: | :--------------------------------------: |
| 管理员登录 |  manage   |           mid    mname  mpass            |
|  方向   | direction |              did     dname               |
|  阶段   |   stage   |              sid sname did               |
|  班级   |  classes  |              cid,cname,did               |
|  教师   |  teacher  |       tid,tname,did,sid,cid,tpass        |
|  学生   |  student  |       uid,uname,did,sid,cid,upass        |
|       |           |                                          |
|  试题   |   test    | tid,ttitle,options,answer,exp,type,author,score,sid |
|       |   type    |                tid,tname,                |

#### 16.路由规则

| 模块   | 路径               | 组件名称          |
| ---- | ---------------- | ------------- |
| 登陆   | /                | login         |
| 管理员  | /admin           | admin         |
|      | /admin/direction | direction     |
|      | /admin/stage     | stage         |
|      | /admin/teacher   | manageTecher  |
|      | /admin/student   | manageStudent |
| 教师   | /teacher         | teacher       |
|      | /teacher/test    | test          |
|      | /teacher/paper   | paper         |
|      | ......           |               |
| 学生   | /student         | student       |
|      | /student/record  | record        |
|      | /student/query   | query         |
|      |                  |               |