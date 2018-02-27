
<!--<template>
<div>
    <table class="table table-bordered">
        <tr>
            <th>序号</th>
            <th>名称</th>
            <th>操作</th>
        </tr>
        <tbody v-html="tel">

        </tbody>
    </table>
</div>
</template> -->
<script>
    export default {
        name: 'Hello',
        data() {
            return {
                tel:'',
                data4: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],

            };
        },
        render(h){
            return h("div","div");
        },
        created(){
            var step=0,flag="-",tel="";
            function getTree(arr,step,flag){
                var sin = flag.repeat(step);
                for(var i=0;i<arr.length;i++){
                    tel+=`<tr><td>${arr[i].id}</td><td>${sin+arr[i].label}</td><td>删除</td></tr>`;
                    if(arr[i].children){
                        step ++;
                        getTree(arr[i].children,step,flag);
                        step --;
                    }
                }
                return tel;
            }
            tel = getTree(this.data4,0,flag)
            console.log(tel);
            this.tel = tel;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>