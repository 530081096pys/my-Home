<template>
    <div class="login">
        <span @click="back">首页</span>
        <div class="group">
            <label for="phone">电话</label>
            <input type="text" id="phone" v-model="phone">
        </div>
        <div class="group">
            <label for="pass">密码</label>
            <input type="password" id="pass" v-model="pass">
        </div>
        <div class="submit" @click="login">登录</div>
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
            }
        },
        methods:{
            login(){
                var phone = this.phone;
                var pass = this.pass;
                fetch('/api/Flogin?phone='+phone+'&pass='+pass).then(function (e) {
                    return e.json();
                }).then((e)=>{
                    this.$store.commit('setName',e[0].uname);
                    this.$store.commit('setLogid',e[0].uid);
                    this.$store.commit('setLogin','yes')
                    this.$router.push('/');
                })
            },
            back(){
                this.$router.push('/');
            },
            reg(){
                this.$router.push('/reg');
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