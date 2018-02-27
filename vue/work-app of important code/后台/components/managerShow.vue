<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="aid"
                label="id"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.aid }}</span>
            </template>
        </el-table-column>

        <el-table-column
                prop="aname"
                label="姓名"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.aname }}</span>
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
                prop="rname"
                label="角色">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.rname }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.row)" v-show="isShowEditBtn">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)" v-show="isShowDelBtn">删除</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        >
                    <router-link :to="'/editPass/'+scope.row.aid">修改密码</router-link>
                </el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
    export default {
        name: 'Hello',
        data() {
            return {
                tableData: [],
                isShowEditBtn:false,
                isShowDelBtn:false,
            }
        },
        mounted(){
            var aid = this.$store.state.aid;
            var rid = this.$store.state.rid;
            fetch("/api/show?aid="+aid+"&rid="+rid).then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData = e.data;
                if(aid == 1){
                    this.isShowDelBtn=true;
                    this.isShowEditBtn=true;
                }else{
                    this.isShowEditBtn = e.lids.lid.indexOf('4')> -1 ?true:false;
                    this.isShowDelBtn = e.lids.lid.indexOf('2')> -1 ?true:false;
                }
            })
        },
        methods: {
            handleEdit(data) {
                this.$router.push({path:'editManager',query:data});
            },
            handleDelete(data) {
                var aid = data.aid;
                var ok = window.confirm("确定要删除么？");
                if(ok){
                    fetch('/api/delManager?aid='+aid).then(function (e) {
                        return e.text();
                    }).then( (e)=> {
                        if(e=='ok'){
                            alert('success');
                            this.tableData = this.tableData.filter(e=>{
                                return e.aid != aid;
                            });
                        }else{
                            alert('fail');
                        }
                    })
                }else{
                    alert('删除失败')
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>