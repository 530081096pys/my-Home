<template>
    <div class="home">
        <header>
            <div @click="back"><</div>
            <span>个人中心</span>
            <div></div>
        </header>
        <router-link to="pass">修改密码</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {}
        },
        methods:{
            back(){
                this.$router.back();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        box-sizing: border-box;
    }
.home{
    position: absolute;
    top:0;left:0;
    width:100%;
    height:100%;
}
    header{
        background-color: #cccccc;
        padding: 8px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        width:100%;
        height: 44px;
    }
</style>