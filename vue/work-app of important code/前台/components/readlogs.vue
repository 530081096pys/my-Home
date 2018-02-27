<template>
<div class="read">
    <a href="" class="read-containr" v-for="item in data">
        <div class="smallCon">
            <label >{{type}} to/by {{item.uname}}</label>
            <span>time:{{item.time}}</span>
        </div>
        <div class="title">
            <label >title:</label>
            <span class="overflow">{{item.title}}</span>
        </div>
        <div class="con">
            <label >内容:</label>
            <span class="overflow">{{item.con}}</span>
        </div>
    </a>
</div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                type:'',
                data:[],
                name:'aa',
                sender:'',
            }
        },
        mounted(){
            this.type = 'send';
            this.sender = this.$store.state.logid;
            var sender =this.sender;
            fetch('/api/getLogs?sender='+sender).then(function (e) {
                return e.json();
            }).then((e)=>{
                this.data = e;
            })
        },
        watch:{
            $route(){
                this.type = this.$route.params.type;
                if(this.type =='send'){
                    var sender =this.sender;
                    fetch('/api/getLogs?sender='+sender).then(function (e) {
                return e.json();
                    }).then((e)=>{
                        this.data = e;
                    })
                }else{
                    var sender =this.sender;
                    fetch('/api/getLogsR?sender='+sender).then(function(e){
                        return e.json()
                    }).then((e)=>{
                        this.data = e;
                    })
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
.read{
    width:100%;
    height:100%;
    padding:8px;
}
    .read-containr{
        display: block;
        width: 100%;
        height: 100px;
        border: 1px solid #cccccc;
        box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.4);
        color:#000;
        text-decoration: none;
        padding:4px;
        margin-top: 8px;
        margin-bottom: 20px;
    }
    .read-containr>div{
        margin-top: 2px;
    }
    .smallCon{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .smallCon>span{
        color: #cccccc;
        font-size: 12px;
    }
    .read-containr>div:nth-of-type(2) , .read-containr>div:nth-of-type(3){
        margin-left: 6px;
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
    }
    .overflow{
        width: 80%;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
    }
</style>