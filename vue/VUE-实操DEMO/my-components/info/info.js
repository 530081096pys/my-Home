Vue.component('info',{
    props:['show','message'],
    template:`<div class="info" v-show="show">{{message}}</div>`
})