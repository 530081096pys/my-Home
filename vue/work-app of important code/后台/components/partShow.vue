<template>
    <el-table
            :data="tableData"
            style="width: 100%">

        <el-table-column
                prop="pid"
                label="部门id"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.pid }}</span>
            </template>
        </el-table-column>

        <el-table-column
                prop="pname"
                label="部门名称"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.pname }}</span>
            </template>
        </el-table-column>

        <el-table-column
                prop="parentid"
                label="所属部门id"
                width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.parentid }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
    export default {
        name: 'Hello',
        methods: {
            handleClick(row) {
                console.log(row);
            }
        },
        data() {
            return {
                tableData: []
            }
        },
        mounted(){
            fetch('/api/partShow').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData = e.data;
            })
        },
        methods: {
            handleEdit(data) {
                var pid =data.pid;
                var parentid = data.parentid;
                var pname = data.pname;
                this.$router.push({path:'editPart',query:{pid,parentid,pname}});
            },
            handleDelete(data) {
                var pid = data.pid;
                var parentid = data.parentid;
                var ok = window.confirm("确定要删除么？");
                if(ok){
                    fetch('/api/delPart?pid='+pid+"&parentid="+parentid).then(function (e) {
                        return e.text();
                    }).then( (e)=> {
                        if(e=='ok'){
                            alert('success');
                            this.tableData = this.tableData.filter(e=>{
                                return e.pid != pid;
                            });
                        }else if(e=='haveSon'){
                            alert('仍存在子部门，不可删除');
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