<template>
     <div class="phone">
          <header>
               <span>联系人</span>
          </header>
          <ul>
               <li v-for="item in data">
                    <a :href="'tel:'+item.phone">{{item.uname}}</a>
               </li>
          </ul>
          <Foot>

          </Foot>
     </div>
</template>

<script>
     import Foot from '@/components/foot'
    export default {
        name: 'Hello',
        components:{Foot},
        data() {
            return {
                data:[],
            }
        },
        mounted(){
            fetch('/api/fuserShow').then(function(e){
                return e.json();
            }).then((e)=>{
                this.data =e;
                console.log(this.data);
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     *{
     box-sizing: border-box;
}
     .phone{
          width:100%;
          position: absolute;
          top:0;left:0;
     }
header{
     width:100%;
     height: 44px;
     background-color: #cccccc;
     text-align: center;
     line-height: 44px;
}
.phone>ul{
     width:100%;
     height: auto;
     padding:8px;
}
     .phone>ul>li{
          width: 100%;
          height: 32px;
          line-height: 32px;
          border-bottom: 1px solid #cccccc;
          text-align: center;
     }
     .phone>ul>li>a{
          text-decoration: none;
          color:red;
     }
</style>