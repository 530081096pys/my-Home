var todolist = Vue.component('todo',{
    template:`<div class="demo">
                <input type="text" placeholder="请输入内容" v-model="content" @keydown.13="add">
                <div class="chance">
                     <button @click="changeStatus('all')" :class="{status:status=='all'}">全部</button>       
                     <button @click="changeStatus('1')" :class="{status:status=='1'}">已完成</button>       
                     <button @click="changeStatus('0')" :class="{status:status=='0'}">未完成</button>       
                </div>
                <ul>
                   <li v-for="item in all">
                        <div class="aa" v-show="item.edit" @dblclick="edit(item)">
                       <div class="circle" @click="cstatus(item)" :class="{red:item.status==1}"></div>
                       <span>{{item.content}}</span>
                       <button @click="del(item.id)">删除</button>
                       </div>
                       <input type="text" v-model="item.content" v-show="!item.edit" @blur="item.edit = !item.edit">
                   </li>
                   
</ul>
</div>`,
    data(){
        return{
            datas:localStorage.todo?JSON.parse(localStorage.todo):[],
            content:'',
            status:'all',
        }
    },
    computed:{
        all(){
            return this.datas.filter(e=>{
                if(this.status =='all'){
                    return e;
                }
                if(this.status =='0'){
                    return e.status == 0;
                }
                if(this.status =='1'){
                    return e.status == 1;
                }
            })
        }
    },
    methods:{
        add(){
            var obj = {};
            obj.content = this.content;
            obj.status = 0;
            obj.id = Math.random() * new Date().getTime();
            obj.edit = true;
            this.datas.push(obj);
            this.content='';
            localStorage.todo = JSON.stringify(this.datas);
        },
        changeStatus(val){
            this.status = val;
        },
        cstatus(val){
            if(val.status == 0){
                val.status = 1;
            }else{
                val.status = 0;
            }
            localStorage.todo = JSON.stringify(this.datas);
        },
        del(id){
            this.datas = this.datas.filter(e=>e.id != id);
            localStorage.todo = JSON.stringify(this.datas);
        },
        edit(obj){
            obj.edit = !obj.edit;
            localStorage.todo = JSON.stringify(this.datas);
        }
    }
})