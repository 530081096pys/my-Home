var Index = Vue.component('index',{
    template:`<div class="body">
           <div class="con">
               <div class="left">
                     <router-view name="left"></router-view>
               </div>
               <div class="right">
                    <router-view name="right"></router-view>
               </div>
           </div>
</div>`
});

var Left = Vue.component('left',{
    template:`<div>
            <li v-for="item in data">
                <router-link :to="'#'+'a'+item.id">{{item.title}}</router-link>
                <ul> 
                    <li v-for="item1 in item.child"> 
                        <router-link :to="'#'+'a'+item1.id">{{item1.title}}</router-link>
                    </li>
                </ul>
            </li>

</div>`,
    data(){
        return {
            menu:[],
        }
    },
    computed:{
        data(){
            var arr = [];
            for(var i in this.menu){
                    if(this.menu[i].pid ==0){
                        arr.push(this.menu[i])
                    }else{
                        for(var j in arr){
                            if(arr[j].id == this.menu[i].pid){
                                console.log('you');
                                if(arr[j].child){
                                    arr[j].child.push(this.menu[i])
                                }else{
                                    console.log(111);
                                    arr[j].child = [];
                                    arr[j].child.push(this.menu[i]);
                                }
                            }
                        }
                    }
                }
                console.log(arr)
                return arr;
        }
    },
    mounted(){
        fetch('./data.txt').then(function(e){
            return e.json();
        }).then((e)=>{
            this.menu = e;
            console.log(this.menu);
        })

    }
});

var Right = Vue.component('right',{
    template:`<div>
        <div v-html="datas">
        
</div>
</div>`,
    data(){
        return {
            datas:'',
        }
    },
    mounted(){
        fetch('./doc.txt').then(function(e){
            return e.text();
        }).then((e)=>{
            this.datas = e;
        })
    },
    watch:{
       $route(){
           var hash = this.$route.hash.slice(1);
           var top = document.querySelector("#"+hash).offsetTop - 40 ;
           console.log(top);
           function animate () {
               if (TWEEN.update()) {
                   requestAnimationFrame(animate)
               }
       }

           new TWEEN.Tween({ number: document.querySelector(".right").scrollTop })
               .easing(TWEEN.Easing.Quadratic.Out)
               .to({ number: top }, 500)
               .onUpdate(function () {
                   document.querySelector(".right").scrollTop = this.number.toFixed(0)
               })
               .start()

           animate()
       }
    }
});

var Quick = Vue.component('quick',{
    template:`<div style="width: 100%;position: absolute;top:40px;">{{datas}}</div>`,
    data(){
        return {
            datas:"quick1111111111111111111111111111111111",
        }
    }
})