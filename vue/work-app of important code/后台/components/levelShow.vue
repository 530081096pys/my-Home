<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="lname"
                label="权限名称"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.lname }}</span>
            </template>
        </el-table-column>

        <el-table-column
                prop="lnum"
                label="权限代码"
                width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.lnum }}</span>
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
            fetch('/api/levelShow').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData = e;
            })
        },
        methods: {
            handleEdit(data) {
                //this.$router.push('/editLevel/'+data.lid);
                this.$store.commit('setLevel',data);
                this.$router.push('/editLevel/'+data.lid);
            },
            handleDelete(data) {
                var lid = data.lid;
                var ok = window.confirm("确定要删除么？");
                if(ok){
                    fetch('/api/delLevel?lid='+lid).then(function (e) {
                        return e.text();
                    }).then( (e)=> {
                        if(e=='ok'){
                            alert('success');
                            this.tableData = this.tableData.filter(e=>{
                                return e.lid != lid;
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