<template>
    <div class="bigbox">
        <el-form ref="form"  label-width="80px">

            <el-form-item label="部门名称">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-form-item>

            <el-form-item label="所属部门">
                <el-input v-model="parentName1" disabled placeholder="请输入内容"></el-input>
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
                pname1:'',
                parentId:0,
                parentId1:0,
                parentName:"",
                pid:'',
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                aimdata:'',
            };
        },
        computed:{
            parentName1(){
                var ppname;
                function getParName(arr,pid){
                    for(var k = 0;k<arr.length;k++){
                        if(pid ==0){
                            ppname ='这是一级部门'
                        }
                        if(pid == arr[k].pid){
                            ppname = arr[k].label;
                        }else{
                            getParName(arr[k].children,pid)
                        }
                    }
                }
                getParName(this.data,this.parentId);
                return ppname;
            }
        },
        created(){
            var ppid = this.$route.query.parentid
            fetch('/api/addPartShow').then(function(e){
                return e.json();
            }).then((e)=>{
                var data = e.data;
                var arr=[];
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
            this.pname = this.$route.query.pname;
            this.pname1 = this.$route.query.pname;
            this.parentId = this.$route.query.parentid;
            this.parentId1 = this.$route.query.parentid;

        },
        methods: {
            handleNodeClick(data) {
                this.parentId = data.pid;
                this.aimdata = data.children;
            },
            onSubmit(){
                if(this.pname==this.pname1 && this.parentId==this.parentId1){
                    alert('数据没有改变')
                }
                fetch('/api/editPart?pname='+this.pname+"&parentId="+this.parentId+"&pid="+this.$route.query.pid).then(function(e){
                    return e.text();
                }).then((e)=>{
                    if(e=='ok'){
                        alert('success');
                        this.$router.push('/partShow');
                    }else{
                        alert('fail');
                    }
                })
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