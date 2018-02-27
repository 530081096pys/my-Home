<template>
    <div>
        <h3 style="text-align: center">部门选择</h3>
        <div class="part" v-model="uSPid">
            <router-view></router-view>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%"
        v-show="uShow"
        >
            <el-table-column
                    prop="uid"
                    label="id"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.uid }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="uname"
                    label="姓名"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.uname }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="phone"
                    label="电话"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="photo"
                    label="头像"
                    width="180">
                <template slot-scope="scope">
                    <img :src="'http://localhost:7776/'+scope.row.photo" alt="" style="width:100px;">
                </template>
            </el-table-column>

            <el-table-column
                    prop="pname"
                    label='部门角色'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.pname }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row)" >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)" >删除</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                    >
                        <router-link :to="'/editPass/'+scope.row.aid">修改密码</router-link>
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                tableData: [],
//                isShowEditBtn:false,
//                isShowDelBtn:false,
            }
        },
        mounted(){

            /*fetch('/api/userShow').then(function(e){
                return e.json();
            }).then((e)=>{
                this.tableData = e.data;
            })*/
        },
        methods: {
            handleEdit(data) {
                this.$router.push({path:'editManager',query:data});
            },
            handleDelete(data) {
                var uid = data.uid;
                var ok = window.confirm("确定要删除么？");
                if(ok){
                    fetch('/api/delUser?uid='+uid).then(function (e) {
                        return e.text();
                    }).then( (e)=> {
                        if(e=='ok'){
                            alert('success');
                            this.tableData = this.tableData.filter(e=>{
                                return e.uid != uid;
                            });
                        }else{
                            alert('fail');
                        }
                    })
                }else{
                    alert('删除失败')
                }
            },
        },
        computed:{
            uShow(){
                return this.$store.state.Sable;
            },
            uSPid(){
                return this.$store.state.SUPid;
            }
        },
        watch:{
            uSPid(){
                var pid = this.$store.state.SUPid;
                console.log(pid);
                fetch('/api/userShow?pid='+pid).then(function(e){
                    return e.json();
                }).then((e)=>{
                    this.tableData = e.data;
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .part{
        width:200px;
        height: 200px;
        border:2px solid #cccccc;
        padding:4px;
        margin-bottom:12px;
        margin-left:auto;
        margin-right:auto;
    }
</style>