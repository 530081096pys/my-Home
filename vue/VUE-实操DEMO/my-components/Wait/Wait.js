var Wait =  Vue.component('Wait',{
    props:['show'],
    template:`<div v-show="show==true" class="wait"></div>`,
})