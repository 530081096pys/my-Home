<template>
    <div class="bigbox">
        <header>
            <div></div>
            <span>首页</span>
            <router-link to="/login">登录</router-link>
        </header>
        <div class="header">
            <slider>
                <li><img src="../assets/img/b1.jpg" alt=""></li>
                <li><img src="../assets/img/b2.jpg" alt=""></li>
                <li><img src="../assets/img/b3.jpg" alt=""></li>
                <li><img src="../assets/img/b4.jpeg" alt=""></li>
            </slider>
        </div>

        <div class="con">
            <news :fn="fn" :autoShow="autoShow">
                <ul>
                    <li v-for="item in data" >
                        <router-link :to="'/list/'+item.nid">
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </news>
        </div>


        <Foot>

        </Foot>
    </div>
</template>

<script>
    import slider from "@/components/slider"
    import news from "@/components/news"
    import Foot from '@/components/foot'

    export default {
        name: 'Hello',
        template:'<slider/>',
        components:{slider,news,Foot},
        data() {
            return {
                data:[],
                autoShow:true,
                page:0,
            }
        },
        mounted(){

        },
        methods:{
            fn(obj){
                fetch('/api/getNews?page='+this.page).then(function(e){
                    return e.json();
                }).then((e)=>{
                    this.data = e.concat(this.data);
                    this.page++
                    setTimeout(obj.over,1000)
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bigbox{
        position:absolute;
        top:0;left:0;
        width:100%;
        height: 100%;
    }
.header{
    width:100%;
    height:150px;
    overflow: hidden;
    margin-top:44px;
}
    .con{
        width:100%;
        height: 500px;
    }
header{
    width:100%;
    height:44px;
    position: fixed;
    top:0;left:0;
    text-align: center;
    color:#000;
    line-height: 44px;
    background-color: #cccccc;
    display: flex;
    justify-content: space-around;
}
    header>a{
        text-decoration: none;
        color: #000000;
    }
</style>