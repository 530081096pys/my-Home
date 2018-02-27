<template>
    <div class="bigbox">
        <el-form ref="form"  label-width="80px">

            <div @click="aa">一级部门</div>

            <el-form-item label="部门名称">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-form-item>

            <el-form-item label="部门名称">
                <el-input v-model="pname" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pname:'',
                parentId:0,
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                aimdata:'',
            };
        },
        created(){
            fetch('/api/addPartShow').then(function(e){
                return e.json();
            }).then((e)=>{
                var data = e.data;
                var arr=[];
                console.log(data);
                function tree(data,num,arr){
                    for(var i=0;i<data.length;i++){
                        var obj = {};
                        if(data[i].parentid==num){
                            obj.label = data[i].pname;
                            obj.pid = data[i].pid;
                            obj.children = [];
                            arr.push(obj);
                            tree(data,data[i].pid,obj.children);
                        }
                    }
                }
                tree(data,0,arr);
                this.data= arr;
            })
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
                this.parentId = data.pid;
                this.aimdata = data.children;
            },
            onSubmit(){
                fetch('/api/addPart?pname='+this.pname+"&parentId="+this.parentId).then(function(e){
                    return e.text();
                }).then((e)=>{
                    if(e != 'fail'){
                        console.log(e);
                        alert('success');
                        this.aimdata.push({label:this.pname,pid:e,children:[]});
                        this.pname="";
                    }else{
                        alert('fail');
                    }
                })
            },
            aa(){
                this.parentId = 0;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bigbox{
        width: 300px;
        height: 250px;
        padding:15px;
        border:1px solid #ccc;
        position:absolute;
        top:0;bottom:0;left:0;right:0;
        margin:auto auto;
    }
</style>