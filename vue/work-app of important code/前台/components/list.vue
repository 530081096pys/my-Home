<template>
<div class="list">
    <i @click="back" style="font-weight: bold;font-size: 10px;">返回</i>
    <h3 style="text-align: center">{{title}}</h3>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;{{con}}</p>
    <img src="../assets/img/b2.jpg" alt="">
</div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                title:'1',
                con:'2'
            }
        },
        methods:{
            back(){
                this.$router.back();
            }
        },
        mounted(){
            var nid = this.$route.params.nid;
            fetch('/api/conShow?nid='+nid).then(function (e) {
                return e.json();
            }).then((e)=>{
                this.title = e[0].title;
                this.con = e[0].con
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list{
    padding:4px;
}
    h3{
        margin-top:20px;
    }
    p{
        margin-top:20px;
        padding:15px;
        line-height: 25px;
    }
    img{
        display: block;
        width:100%;
        height: 200px;
    }
</style>