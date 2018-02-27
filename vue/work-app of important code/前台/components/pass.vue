<template>
    <div class="pass">
        <div class="group">
            <label for="pass">原密码</label>
            <input type="password" id="pass" v-model="opass">
        </div>
        <div class="group">
            <label for="npass">新密码</label>
            <input type="password" id="npass" v-model="npass">
        </div>
        <div class="group">
            <label for="apass">密码确认</label>
            <input type="password" id="apass" v-model="apass">
        </div>
        <div>{{message}}</div>
        <div @click="sub" class="sub">提交</div>
    </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                opass:'',
                npass:'',
                apass:'',
                message:'',
            }
        },
        methods:{
            sub(){
                var opass = this.opass;
                var npass = this.npass;
                var apass = this.apass;
                if(opass.length<6){
                    this.message = '原密码至少六位';
                    return;
                }
                if(npass.length<6){
                    this.message = '新密码至少六位';
                    return;
                }
                if(apass.length<6){
                    this.message = '新密码至少六位';
                    return;
                }
                if(npass!=apass){
                    this.message = '两次输入新密码不同';
                    return;
                }
                if(opass==npass){
                    this.message = '你逗我呢？新旧密码一个样的..'
                    return;
                }
                this.message = '可以修改';
                var uid = this.$store.state.logid;
                fetch("/api/userPass?opass="+opass+
                    "&npass="+npass+"&uid="+uid).then(function (e) {
                    return e.text();
                }).then((e)=>{
                    this.message = e;
                })
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        box-sizing: border-box;
    }
.pass{
    padding:8px;
}
    .group{
        margin-top: 15px;
        padding:8px;
        background-color: #cccccc;
        width:100%;
        height:auto;
        display: flex;
        justify-content: space-around;
    }
    .sub{
        margin-top:30px;
    }
</style>