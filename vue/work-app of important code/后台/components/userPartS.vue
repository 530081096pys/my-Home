<template>
     <div class="pbox">
         <i class="el-icon-back" v-show="isShow" @click="back"></i>
        <li v-for="item in data" class="li">
            <router-link :to="'/listS/'+item.pid" v-if="item.son">{{item.pname}}</router-link>
            <span v-if="!item.son" :style="item.style" @click="Part(item)">{{item.pname}}</span>
        </li>
     </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                data:[],
            }
        },
        created(){
            this.$store.commit("setSable",false);
            var pid = this.$route.params.pid||0;
            fetch('/api/userPart?pid='+pid).then(function (e) {
                return e.json()
            }).then((e)=>{
                this.data = e;
            })
        },
        watch:{
            $route(){
                this.$store.commit("setSable",false);;
                var pid = this.$route.params.pid||0;
                /*fetch('/api/partShow').then(function(e){
                    return e.json()
                }).then((e)=>{
                    console.log(e.data);
                    var arr = e.data;
                    for(var i =0;i<arr.length;i++){
                        if(pid == arr[i].parentid){

                        }else{

                        }
                    }
                })*/
                fetch('/api/userPart?pid='+pid).then(function (e) {
                    return e.json()
                }).then((e)=>{
                    this.data = e;
                })
            }
        },
        computed:{
            isShow(){
                if(this.$route.path =="/addUser" ||this.$route.path=='/userShow'){
                    return false;
                }else{
                    return true;
                }
            }
        },
        methods:{
            back(){
                this.$router.back();
                this.$store.commit('setSUPid','')
            },
            Part(obj){
                for(var i=0;i<this.data.length;i++){
                    this.data[i].style={};
                }
                obj.style = {color:'red'}
                var pid=obj.pid;
                this.$store.commit('setSUPid',pid);
                this.$store.commit("setSable",true);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.li a{
    color:deepskyblue;
}
</style>