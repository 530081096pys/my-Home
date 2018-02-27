<template>
    <div class="bigbox">
        <div class="group">
            <label for="old">请输入旧密码</label>
            <input type="password" v-model="old" id="old">
        </div>
        <div class="group">
            <label for="news">请输入新密码</label>
            <input type="password" v-model="news" id="news">
        </div>
        <div class="group">
            <label for="again">请再次输入新密码</label>
            <input type="password" v-model="again" id="again">
        </div>
        <div class="submit" @click="submit">提交</div>
        <span>{{message}}</span>
    </div>
</template>

<script>
    export default {
        name: 'editPass',
        data() {
            return {
                old:"",
                news:'',
                again:'',
                message:'',
            }
        },
        methods:{
            submit(){
                if(this.old == ''){
                    this.message = '旧密码不能为空';
                    return;
                }
                if(this.news == ""){
                    this.message = '新密码不能为空';
                    return;
                }
                if(this.again ==""){
                    this.message = '确认密码不能为空';
                    return;
                }
                if(this.again !== this.news){
                    this.message = '两次密码不同';
                    return;
                }
                this.message = '可以提交';
                var query = "old="+this.old+"&news="+this.news+"&aid="+this.$store.state.aid;
                fetch('/api/editPass?'+query).then(function(e){
                    return e.text();
                }).then((e)=>{
                    this.message = e;
                    if(e=='修改成功'){
                        this.$store.commit('setAname','');
                        this.$store.commit('setRid','');
                        this.$store.commit('setAid','');
                        this.$store.commit("setLogin","");
                        this.$router.push('/login');
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bigbox{
        width:100%;
        height: auto;
        text-align: center;
    }
    .bigbox .group{
        width:100%;
        height: auto;
        display: flex;
        justify-content: space-around;
        padding:20px;
    }
    .group label{
        width:20%;
        height: auto;
        line-height: 30px;
    }
    .group input{
        width:60%;
        height: 30px;
        border-radius: 4px;
    }
    .submit{
        display: inline-block;
        padding:4px;
        width:auto;height: auto;
        border: 1px solid #cccccc;
        background-color: #cccccc;
        cursor: pointer;
    }
    input:focus{
        outline: none;
        border: 1px solid lawngreen;
    }
    span{
        display: block;
        color:red;
        font-size: 30px;
    }
</style>