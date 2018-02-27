<template>
    <div class="bigbox">
        <div class="write">
            <div class="title">
                <span>标题：</span>
                <input type="text" v-model="title" @blur="save">
            </div>
            <div class="con">
                <span>内容：</span>
                <textarea  id="" cols="30" rows="10" v-model="con" @blur="save"></textarea>
            </div>
            <div class="con">
                <span>收件人：</span>
                <span>{{message}}</span>
            </div>
            <div  class="btn" @click="user" >选择收件人</div>
        </div>
        <div  class="submit" >
            <span @click="submit">提交</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                title:'',
                con:'',
                sender:'',
                message:'',
                uid:'',
            }
        },
        mounted(){
            this.title = this.$store.state.title;
            this.con = this.$store.state.con;
            this.sender = this.$store.state.logid;
            this.message = this.$store.state.uname?this.$store.state.uname:'暂无选择';
            this.uid = this.$store.state.uid;
        },
        methods:{
            user(){
                this.$router.push('/getUser');
            },
            submit(){
                var title = this.title;
                var con = this.con;
                var uid = this.uid;
                var sender = this.sender;
                var params = "title="+title+"&con="+con+"&uid="+uid+"&sender="+sender
                fetch('/api/addLogs?'+params).then(function (e) {
                    return e.text();
                }).then((e)=>{
                    if(e=='ok'){
                        alert('发送成功');
                        this.$store.commit('setTitle','');
                        this.$store.commit('setCon','');
                        this.$store.commit('setUname','');
                        this.$store.commit('setUid','');
                        this.$router.push('/logs');
                    }
                })
            },
            save(){
                this.$store.commit('setTitle',this.title);
                this.$store.commit('setCon',this.con);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        box-sizing: border-box;
    }
    bigbox{
        width:100%;
        height: 100%;
    }
.write{
    width:100%;
    height: 100%;
    padding: 12px;
}
    .write>div{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
textarea{
    resize: none;
}
    .write>.btn{
        display: block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #cccccc;
        margin-top: 12px;
        outline: none;
    }
    .submit{

        width: 80px;
        margin:0 auto;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background-color: #cccccc;
        color:#ffffff;
        margin-top: 12px;
    }
</style>