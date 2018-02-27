<template>
    <el-container>
        <el-header>
            <span>后台管理系统 </span>
            <div class="message">
                <span>欢迎</span>
                <span>{{aname}}</span>
            </div>
            <div class="choose">
            <el-button type="primary" plain @click="log" class="login">重新登录</el-button>
            <el-button type="danger" plain @click="logout" class="out">退出</el-button>
            </div>
        </el-header>
        <el-container class="main">
            <el-aside width="200px">
                <Aside></Aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Aside from "./aside"
    export default {
        name: 'Container',
        data() {
            return {
                aname:''
            }
        },
        template:'<Aside></Aside>',
        components:{Aside},
        mounted(){
            this.aname = this.$store.state.aname;
        },
        methods:{
            logout(){
//                sessionStorage.removeItem('login');
                this.$store.commit('setLogin',"");
                this.$router.push("/login");
            },
            log(){
                this.$router.push('/login');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        height:10vh;
        position:relative;
    }
    .el-header>span:nth-of-type(1){
        display: block;
        margin-top: 8px;
    }
    .choose{
        width:auto;
        height: auto;
        padding:4px;
        position: absolute;
        bottom:0;right:0;
    }
    .choose>button{
        display: block;
        float:left;
        margin-right: 4px;
    }
    .message{
        width:auto;
        height:auto;
        position: absolute;
        left:14px;bottom:0px;
        padding:4px;
        font-size: 22px;
        color: #ffffff;
    }
    .el-header>span{
        font-size: 30px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .main{
        height:90vh;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        position:relative;
    }

    /*body > .el-container {*/
        /*margin-bottom: 40px;*/
    /*}*/

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>