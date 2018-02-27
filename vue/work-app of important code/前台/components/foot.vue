<template>
    <footer>
        <router-link to="/" tag="div" exact>首页</router-link>
        <router-link to="/phone" tag="div" exact>电话</router-link>
        <router-link to='/logs' tag="div" exact>日志</router-link>
        <router-link to="/home" tag="div" exact>个人中心</router-link>
    </footer>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    footer{
        position:fixed;
        width:100%;
        line-height: 44px;
        bottom:0;
        background-color: #ffffff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top:1px solid #000;
    }
    footer>div{
        background-color: #ccc;
    }
</style>