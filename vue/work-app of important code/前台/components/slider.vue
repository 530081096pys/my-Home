<template>
    <div class="head-contain" ref="contain" @touchstart="start($event)">

            <slot></slot>

    </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                num:4,
                contain:null,
                startx:0,
                starty:0,
                movex:0,
                movey:0,
                direction:'',
                current:0,
                length:100,
                moveNum:0,
            }
        },
        mounted(){
            var contain = this.$refs['contain'];
            this.contain = contain;

        },
        methods:{
            start(e){
                this.contain.style.transition='none';
                this.current=parseInt(getComputedStyle(this.contain,null)['marginLeft'])?parseInt(getComputedStyle(this.contain,null)['marginLeft']):0;
                this.startx = e.touches[0].pageX;
                this.starty = e.touches[0].pageY;
                this.contain.addEventListener('touchmove',this.move);
                this.contain.addEventListener('touchend',this.end);
            },
            move(e){
                this.movex=e.touches[0].pageX;
                this.movey=e.touches[0].pageY;
                if(Math.abs(this.movex-this.startx)>10 && (this.movex>this.startx)){
                    this.direction='right';
                    this.contain.style.marginLeft = this.current+this.movex - this.startx+'px' ;
                }
                if(Math.abs(this.movex-this.startx)>10 && (this.movex<this.startx)){
                    this.direction='left';
                    this.contain.style.marginLeft =this.current+ this.movex - this.startx +'px';
                }
            },
            end(e){
                this.contain.removeEventListener('touchmove',this.move);
                this.contain.removeEventListener('touchend',this.end);
                if(this.direction =='right'){
                    if(Math.abs(this.movex-this.startx)>this.length){
                        this.moveNum++;
                        if(this.moveNum>0){
                            this.moveNum = 0;
                        }
                    }
                }else if(this.direction =="left"){
                    if(Math.abs(this.movex-this.startx)>this.length){
                        this.moveNum --;
                        if(this.moveNum<-(this.num-1)){
                            this.moveNum = -(this.num-1)
                        }
                    }
                }
                this.contain.style.marginLeft=this.moveNum * document.documentElement.clientWidth+'px'
                this.contain.style.transition='margin-left 1s ease'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head-contain{
    width:400%;
    height:100%;

}
.head-contain li{
    width:25%;
    height: 100%;
    float:left;
}
.head-contain li img{
    display:block;
    width:100%;
    height: 100%;
}
</style>