<template>
    <div>
        <div class="pbox">
            <li v-for="item in data" class="li" v-if="user.length==0">
                <router-link :to="'/lista/'+item.pid" v-if="item.son">{{item.pname}}</router-link>
                <span v-if="!item.son" :style="item.style" @click="Part(item)">{{item.pname}}</span>
            </li>
            <li v-if="user.length>0" v-for="item in user">
                <span @click="choose(item)" :style="item.style">{{item.uname}}</span>
            </li>
        </div>
        <div class="sub" @click="reback">确认收件人</div>
    </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                data:[],
                user:[],
            }
        },
        created(){
            this.user = [];
            var pid = this.$route.params.pid||0;
            fetch('/api/userPart?pid='+pid).then(function (e) {
                return e.json()
            }).then((e)=>{
                this.data = e;
            })
        },
        watch:{
            $route(){
                this.user = [];
                var pid = this.$route.params.pid||0;
                fetch('/api/userPart?pid='+pid).then(function (e) {
                    return e.json()
                }).then((e)=>{
                    this.data = e;
                })
            }
        },
        computed:{

        },
        methods:{
            Part(obj){
                var pid=obj.pid;
                fetch(`api/getUser?pid=`+pid).then(function (e) {
                    return e.json();
                }).then((e)=>{
                    this.user = e;
                })
            },
            choose(obj){
                for(var i=0;i<this.user.length;i++){
                    this.user[i].style={};
                }
                obj.style = {color:'red'}
                var uid = obj.uid;
                var uname = obj.uname;
                this.$store.commit('setUid',uid);
                this.$store.commit('setUname',uname);
            },
            reback(){
                this.$router.push('/write');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        box-sizing: border-box;
    }
    .pbox{
        padding:14px;
        width:100%;
        height: 100%;
        text-align: center;
    }
    li{
        margin-top: 12px;
        border-bottom: 1px solid #cccccc;
    }
    .li a{
        color:deepskyblue;
        text-decoration: none;
        font-size: 22px;
    }
    .li>span{
        color: #000000;
        text-decoration: none;
        font-size: 22px;
    }
    .sub{
        padding: 8px;
        text-align: center;
        border-radius: 4px;
        position: fixed;
        bottom:54px;
        left:0;right:0;
        margin-left:auto;
        margin-right:auto;
        color:#000000;
        background-color: #cccccc;
    }
</style>