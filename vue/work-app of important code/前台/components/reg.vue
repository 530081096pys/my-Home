<template>
    <div class="login">
        <span @click="back">首页</span>
        <div class="group">
            <label for="phone">电话</label>
            <input type="text" id="phone" v-model="phone" @blur="check">
        </div>
        <div class="group">
            <label for="pass">密码</label>
            <input type="password" id="pass" v-model="pass">
        </div>
        <div class="group">
            <label for="passr">确认密码</label>
            <input type="password" id="passr" v-model="passr">
        </div>
        <span>{{message}}</span>
        <div class="submit" @click="reg">注册</div>
    </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                phone:'',
                pass:'',
                passr:"",
                message:'aa',
            }
        },
        methods:{
            reg(){
                var phone = this.phone;
                var pass = this.pass;
                var passr = this.passr;
                console.log(phone,pass,passr);
                console.log(typeof phone);
                if(phone == 'undefined'){
                    this.message = '电话不能为空';
                    console.log(1)
                    return;
                };
                if(pass == ''){
                    this.message = '密码不能为空';
                    return;
                };
                if(passr == ''){
                    this.message = '请密码再次确认';
                    return;
                };
                if(pass != passr){
                    this.message = '两次密码输入不一致';
                    return;
                };
                this.message = '可以注册!';
                fetch('/api/regF?phone='+phone+'&pass='+pass).then(function(e){
                    return e.text();
                }).then((e)=>{
                    if(e=='ok'){
                        console.log(e);
                        this.message = '注册成功';
                    }
                })
            },
            back(){
                this.$router.push('/')
            },
            check(){
                var phone = this.phone;
                if(phone == ''){
                    this.message = '用户名不能为空';
                    return;
                };
                fetch('/api/creg?phone='+phone).then(function(e){
                    return e.text();
                }).then((e)=>{
                    if(e=='again'){
                        this.message = '电话重复';
                    }
                    if(e=='ok'){
                        this.message = '电话未重复.';
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login{
        position: fixed;
        width:250px;
        height: 250px;
        top:0;left:0;bottom:0;right:0;
        margin:auto auto;
        background-color: #cccccc;
        border:1px solid #000;
        padding:8px;
        box-sizing: border-box;
        font-size: 18px;
    }
    .group{
        margin-top: 20px;
        display: flex;
        align-items: center;
    }
    .group>label{
        width: 20%;
    }
    .group>input{
        flex: 1;
        outline: none;
    }
    .submit{
        width: 60px;
        height:30px;
        margin:30px auto 10px;
        text-align: center;
        line-height: 30px;
        background-color: #000000;
        color: #ffffff;
    }
</style>