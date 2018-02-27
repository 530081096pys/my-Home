<template>
    <div class="newsbox" @touchstart="start($event)" ref="newsbox">
        <div class="newsMessage">
            <span v-show="span">{{message}}</span>
        </div>
        <div class="newsCon" ref="newsCon">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Hello',
        props:['fn','autoShow'],
        data() {
            return {
                newsbox:null,
                startx:0,
                starty:0,
                movex:0,
                movey:0,
                message:'下拉刷新',
                newsCon:null,
                flag:true,
                length:0,
                span:false,
            }
        },
        mounted(){
            console.log(this.autoShow);
            this.newsbox = this.$refs['newsbox'];
            this.newsCon = this.$refs['newsCon'];
            if(this.autoShow==true){
                if(this.fn){
                    this.fn(this)
                }
            }
        },
        methods:{
            start(e){
                if(this.flag){
                    this.message='下拉刷新';
                    this.newsCon.style.transition="none";
                    this.startx=e.touches[0].pageX;
                    this.starty=e.touches[0].pageY;
                    this.newsbox.addEventListener('touchmove',this.move);
                    this.newsbox.addEventListener('touchend',this.end);
                }
            },
            move(e){
                this.span = true;
                this.movex = e.touches[0].pageX;
                this.movey = e.touches[0].pageY;
                this.length = this.movey - this.starty;
                if(this.movey > this.starty && Math.abs(this.movey - this.starty)>5){
                   this.length = (this.movey - this.starty-5)/5;
                    this.newsCon.style.transform="translate(0,"+this.length+"px)"
                }
            },
            end(e){
                if(this.length ==0){
                    this.span = false;
                    return;
                }
                this.message="正在更新";
                this.flag = false;
                this.newsbox.removeEventListener('touchmove',this.move);
                this.newsbox.removeEventListener('touchend',this.end);
                this.newsCon.style.transition="transform .5s ease";
                this.newsCon.style.transform = "translate(0,30px)";
                this.length=0;
                if(this.fn){
                    this.fn(this);
                }
            },
            over(){
                this.flag = true;
                this.message = '更新完毕';
                this.span = false;
                this.newsCon.style.transform = "translate(0,0)"
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newsbox{
    width:100%;
    height: 100%;
    position:relative;
}
    .newsMessage{
        /*position:absolute;*/
        /*top:0;left:0;*/
        text-align: center;
        line-height: 30px;
    }
    .newsCon{
        position:absolute;
        top:0;left:0;
        width:100%;
        height: auto;
    }
    .newsCon>ul>li{
        z-index: 9999;
        padding:10px;
        box-sizing: border-box;
        border-bottom: 1px solid #cccccc;
    }
    .newsCon>ul>li>a{
        color: #000000;
        text-decoration: none;
    }
</style>