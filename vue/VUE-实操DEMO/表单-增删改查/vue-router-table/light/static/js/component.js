//头部
Vue.component('Head',{
    template:` <header>
              <span>表单的增删改查</span>
              <router-link to="/"  active-class="aa" exact>首页</router-link>
              <router-link to="/add"  active-class="bb" exact >添加</router-link>
              <router-link to="/login"  active-class="bb" exact>登录</router-link>
              <span style="font-size: 30px; cursor:pointer" @click="leave">退出</span>
          </header>`,
    methods:{
        leave(){
            console.log(1);
            sessionStorage.removeItem('login');
            this.$router.push('/login');
        }
    }
});

//Main
var Main = Vue.component('Main',{
    template:`<div><Head></Head>
                        <router-view></router-view></div>
`
});
//弹出框
Vue.component('info',{
    props:['show','message'],
    template:`<div class="info" v-show="show">{{message}}</div>`
});
//等待
var Wait =  Vue.component('Wait',{
    props:['show'],
    template:`<div v-show="show==true" class="wait"></div>`,
})
//表单
Vue.component('Table',{
    props:['name'],
    template:`<div>
<table class="table">
          <tr>
            <th v-for="item in name">{{item}}</th>
</tr>
<tr v-for="item in datas">
    <td>{{item.name}}</td>
    <td>{{item.age}}</td>
    <td>{{item.sex}}</td>
    <td>
    <a @click="del(item.id)">删除</a>
    <a :href="'#/edit/'+item.id">编辑</a>
</td>
</tr>
</table>
<Wait :show="show"></Wait>
<info :show="infoshow" message="删除成功"></info>
</div>`,
    data(){
        return {
            datas:'',
            show:true,
            infoshow:false,
        }
    },
    methods:{
        del(id){
            var that = this;
            console.log(that.show);
            that.show = true;
            fetch('/del/'+id).then(function(e){
                return e.text()
            }).then(function(e){
                if(e == 'ok'){
                    that.show = false;
                    that.infoshow = true;
                    that.datas = that.datas.filter(e=>{
                        return e.id != id;
                    })
                }
            })
        }
    },
    mounted(){
        var that = this;
        fetch("/fetch").then(function(e){
            return e.json();
        }).then(function(e){
            that.datas = e;
            that.show = false;
        })
    }
})

//表单——查+删
var Index = Vue.component('index',{
    template:`<Table :name="['姓名','年龄','性别','操作']" ></Table>
`,
});

//表单--添加
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
        <info message="添加成功" :show="infoshow"></info>
        <Wait :show="show"></Wait>
</div>`,
    data(){
        return {
            name:'',
            age:'',
            sex:'',
            infoshow:false,
            show:false,
        }
    },
    methods:{
        add(){
            var that = this;
            that.show = true;
            var str = "name="+this.name+"&age="+this.age+"&sex="+this.sex;
            fetch('/add?'+str).then(function(e){
                return e.text();
            }).then(function(e){
                if(e=='ok'){
                    that.show = false;
                    that.infoshow=true;
                }
                that.name='';
                that.age='';
                that.sex='';
            })
        }
    }
});

//表单--修改
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
        <button @click="addCon()" type="submit" class="btn btn-default">提交</button>
    </form>
    <info :show="infoshow" message="修改成功"></info>
</div>`,
    data(){
        return {
            name:'',
            age:'',
            sex:'',
            infoshow:false,
        }
    },
    mounted(){
        console.log(this);
        var id = this.$route.params.id;
        var that = this;
        fetch('/edit/'+id).then(function(e){
            return e.json();
        }).then(function(e){
            that.name = e[0].name;
            that.age = e[0].age;
            that.sex = e[0].sex;
        })
    },
    methods:{
        addCon(){
            var id = this.$route.params.id;
            var str = "name="+this.name+"&age="+this.age+"&sex="+this.sex;
            fetch('/editCon/'+id+'?'+str).then(function(e){
                return e.text();
            }).then((e)=>{
                if(e == 'ok'){
                    this.infoshow = true;
                }
            })
        }
    }
})

//登录页面
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
    </form>
    <info :message="message1" v-show="show"></info>
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
    <info v-show="show" :message="message1"></info>
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
})


