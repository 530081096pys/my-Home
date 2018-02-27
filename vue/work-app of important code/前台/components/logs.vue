<template>
    <div class="bigbox">
        <div class="logs" v-if="login">
            <header>
                <div @click="back"><</div>
                <div @click="back1" class="home">首页</div>
                <span>日志</span>
                <div  @click="remove">write</div>
            </header>
            <router-view></router-view>
            <footer>
                <router-link to="/readlogs/send" :style="{color:color}">Sending</router-link>
                <router-link to="/readlogs/receive"
                             :style="{color:color1}">Receiving</router-link>
            </footer>
        </div>
        <div v-else class="login">
            <span>请登录后查看日志</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/reg">注册</router-link>
            <router-link to="/">首页</router-link>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                type:'',
                color:'',
                color1:'',
                login:false,
            }
        },
        methods:{
            back(){
                this.$router.back();
            },
            back1(){
                this.$router.push('/');
            },
            remove(){
                this.color = '';
                this.color1 = '';
                this.$router.push('/write')
            }
        },
        mounted(){
            if(this.$store.state.login =="yes"){
                this.login = true;
            }
            this.type = 'send';
            this.color ='red';
        },
        watch:{
            $route(){
                if(this.$store.state.login =="yes"){
                    this.login = true;
                }
                this.type = this.$route.params.type;
                if(this.type =='send'){
                    this.color1='';
                    this.color = 'red';
                }
                if(this.type =='receive'){
                    this.color ='';
                    this.color1 ='red';
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        box-sizing: border-box;
    }
.logs{
    position: absolute;
    top:0;left:0;
    width:100%;
    height:auto;
}
    header{
        background-color: #cccccc;
        width:100%;
        height: 44px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
    }
    header>div:nth-of-type(2){
        color:#fff;
        font-size: 10px;
    }
    footer{
        width:100%;
        height: 44px;
        position:fixed;
        bottom:0;
        background-color: #cccccc;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    footer>a{
        text-decoration: none;
        color: #000000;

    }
    .home{
        position:absolute;
        left:30px;
    }
    .login{
        width:150px;
        height: 150px;
        position:fixed;
        top:0;left:0;right:0;bottom:0;
        margin:auto;
        background-color: #cccccc;
        padding: 8px;
    }
</style>