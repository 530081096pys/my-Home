/*demo测试
var demo = Vue.component('demo',{
    template:`<div>
                <span>{{message}}</span>
              </div>`,
    data(){
        return{
            message:'测试'
        }
    }
});

var test = Vue.component('test',{
    template:`<div>
                <span>{{message}}</span>
</div>`,
    data(){
        return{
            message:'test'
        }
    }
})
*/

/*主框架*/
var Main = Vue.component('Main',{
    template:`
            <div class="main">
                <Head></Head>
                <router-view></router-view>
            </div>
    `
});

/*头部*/
var head = Vue.component('Head',{
    template:`
            <header>
                <span>表单的增删改查</span>
                <router-link to="/" exact active-class="a">首页</router-link>
                <router-link to="/add" exact active-class="a">添加</router-link>
                <router-link to="/login" exact active-class="a">登录</router-link>
            </header>
    `
});

/*表单展示*/
var Index = Vue.component('index',{
    template:`
            <div class="index">
                <Table v-bind:data='data'></Table>
            </div>
    `,
    data(){
        return {
            data: [
                '姓名', '性别', '年龄', '操作'
            ]
        }
    }
})

/*表单*/
var table = Vue.component('Table',{
    props:['data'],
    template:`
        <table>
            <thead>
                <th v-for="item in data">{{item}}</th>
            </thead>
            <tbody>
                <tr v-for="item in datas">
                <td>{{item.name}}</td>
                <td>{{item.sex}}</td>
                <td>{{item.age}}</td>
                <td>
                    <button v-on:click="del(item.id)">删除</button>
                    <router-link :to="'/edit/'+item.id">编辑</router-link>
                </td>
</tr>
            </tbody>   
        </table>
    `,
    data(){
        return{
            datas:[],
        }
    },
    methods:{
        del(id){
            var id = id;
            fetch('/del?id='+id).then(function(e){
                return e.text();
            }).then(e=>{
                if(e=='ok'){
                    this.datas = this.datas.filter(e=>e.id != id)
                }
            })
        }
    },
    mounted(){
        fetch('/query').then(function(e){
            return e.json()
        }).then(e=>{
            this.datas = e;
        })
    }
});

/*添加*/
var Add = Vue.component('add',{
    template:`<div class="container">
    <form action="javascript:;">
        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" class="form-control" id="name" placeholder="请输入姓名" name="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="age">年龄</label>
            <input type="text" class="form-control" id="age" placeholder="请输入年龄" name="age" v-model="age">
        </div>

        <div class="form-group">
            <label for="sex">性别</label>
            <input type="text" class="form-control" id="sex" placeholder="请输入性别" name="sex" v-model="sex">
        </div>
        <button @click="add" class="btn btn-default">提交</button>
    </form>
       
</div>`,
    data(){
        return{
            name:'',
            sex:'',
            age:'',
        }
    },
    methods:{
        add(){
            var query = 'name='+this.name+'&sex='+this.sex+'&age='+this.age;
            fetch('/add?'+query).then(function (e) {
                return e.text();
            }).then(e=>{
                if(e=='ok'){
                    this.name='';
                    this.age='';
                    this.sex='';
                    this.$router.push('/');
                }
            })
        }
    }
});

/*编辑*/
var Edit = Vue.component('edit',{
    template:`<div class="container">
    <form action="javascript:;">
        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" class="form-control" id="name" placeholder="请输入姓名" name="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="age">年龄</label>
            <input type="text" class="form-control" id="age" placeholder="请输入年龄" name="age" v-model="age">
        </div>

        <div class="form-group">
            <label for="sex">性别</label>
            <input type="text" class="form-control" id="sex" placeholder="请输入性别" name="sex" v-model="sex">
        </div>
        <button @click="add" class="btn btn-default">提交</button>
    </form>
</div>`,
    data(){
        return{
            name:'',
            sex:'',
            age:'',
        }
    },
    mounted(){
        var id = this.$route.params.id;
        fetch('/queryEdit?id='+id).then(function(e){
            return e.json();
        }).then(e=>{
            this.name = e[0].name;
            this.sex = e[0].sex;
            this.age = e[0].age;
        })
    },
    methods:{
        add(){
            var query = 'name='+this.name+'&age='+this.age+'&sex='+this.sex+'&id='+this.$route.params.id;
            fetch('/edit?'+query).then(function(e){
                return e.text();
            }).then(e=>{
                if(e=='ok'){
                    this.$router.push('/');
                }
            })
        }
    }
})

/*登录页面*/
var Login = Vue.component('login',{
    template:`<div class="box">
<h2>登录页 <router-link to="/">首页</router-link>
<router-link to="/reg">注册页</router-link>
</h2>
    <img src="/img/login1_03.png" alt="">
    <form action="javascript:;" class="form" method="post">
        <div class="count">
            <img src="/img/3_03.png" alt="" class="pic">
            <input type="text" class="input" name="user" placeholder="亲 请输入您的用户名" v-model="user" >
        </div>
        <div class="pass">
            <img src="/img/2.png" alt="" class="pic">
            <input type="password" class="input" name="pass" placeholder="亲 请输入您的密码" v-model="pass" value="123456">
        </div>
        <input type="submit" class="submit" @click="submit" value="">
        <info :message="message1" v-show="show"></info>
    </form>
</div>`,
    data(){
        return {
            user:'admin',
            pass:'123456',
            message:'',
            message1:'',
            show:false,
        }
    },
    methods:{
        submit(){
            var that = this;
            this.show = false;
            var str = "user="+this.user+"&pass="+this.pass;
            fetch('/save?'+str).then(function(e){
                return e.json();
            }).then((e)=>{
                if(e.state=='ok'){
                    this.message1 = "登录成功";
                    this.show = true;
                    sessionStorage.login = e.code;
                    setTimeout(function(){
                        that.$router.push('/');
                    },1000)
                }else{
                    this.message1='登录失败';
                    this.show = true;
                    this.name='';
                    this.pass='';
                }
            })
        }
    }
})

//注册组件
var Reg = Vue.component('reg',{
    template:`<div class="box">
<h2>注册页 <router-link to="/">首页</router-link>
<router-link to="/login">登录页</router-link>
</h2>
    <img src="/img/login1_03.png" alt="">
    <form action="javascript:;" class="form" method="post">
        <div class="count">
            <img src="/img/3_03.png" alt="" class="pic">
            <input type="text" class="input" name="user" placeholder="亲 请输入您的用户名" v-model="user" @blur="blur">
        </div>
        <div class="pass">
            <img src="/img/2.png" alt="" class="pic">
            <input type="password" class="input" name="pass" placeholder="亲 请输入您的密码" v-model="pass">
        </div>
        <div class="pass">
            <img src="/img/2.png" alt="" class="pic">
            <input type="password" class="input" name="pass" placeholder="亲 请再次输入您的密码" v-model="pass1">
        </div>
        <input type="submit" class="submit"  value="" @click="submit">
    </form>
    <div style="font-size: 30px;font-weight: bold;color:red">{{message}}</div>
</div>`,
    data(){
        return {
            user:'',
            pass:'',
            pass1:'',
            message:'',
            flag:false,
            show:false,
            message1:'',
        }
    },
    methods:{
        blur(){
            fetch('/check?user='+this.user).then(function(e){
                return e.text();
            }).then( (e)=> {
                if(e == 'ok'){
                    this.flag = true;
                    this.message = '';
                }else if(e == 'err'){
                    this.message= "用户名已存在";
                    this.user = '';
                }
            })
        },
        submit(){
            this.show = false;
            var that = this;
            if(this.user == ''){
                this.message = "请输入用户名";
                return;
            };
            if(this.pass == ''){
                this.message = "请输入密码";
                return;
            };
            if(this.pass1 == ''){
                this.message = "请再次输入密码";
                return;
            };
            if(this.pass !== this.pass1){
                this.message = '两次输入的密码不一致';
                return;
            }
            if(this.flag == true){
                this.message = '';
                var str = "user="+this.user+"&pass="+this.pass;
                fetch('/addUser?'+str).then(function(e){
                    return e.text();
                }).then((e)=>{
                    if(e == 'ok'){
                        this.message1 = "注册成功";
                        this.show = true;
                        var t = setTimeout(function () {
                            that.$router.push('/');
                        },1000)
                    }else{
                        this.message1 = "注册失败";
                        this.show = true;
                        this.user = '';
                        this.pass ="";
                        this.pass1 = '';
                    }
                })
            }
        }
    }
});

/*信息显示*/
var Info = Vue.component('info',{
    props:['show','message'],
    template:`<div class="info" v-show="show">{{message}}</div>`
})
