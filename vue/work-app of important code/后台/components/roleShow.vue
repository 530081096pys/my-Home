<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                fixed
                prop="rid"
                label="角色id"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.rid }}</span>
            </template>
        </el-table-column>

        <el-table-column
                fixed
                prop="rname"
                label="角色名称"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.rname }}</span>
            </template>
        </el-table-column>

        <el-table-column
                prop="lid"
                label="权限"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px" v-for="item in scope.row.lid">{{ item.lname }}</span>
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
        name: 'roleShow',
        data() {
            return {
                tableData: []
            }
        },
        mounted(){
            fetch('/api/roleShow').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData = e;
            })
        },
        methods: {
            handleEdit(data) {
                this.$store.commit('setRole',data);
                this.$router.push('/editRole');
            },
            handleDelete(data) {
                var rid = data.rid;
                var ok = window.confirm('确定要删除么？');
                if(ok){
                    fetch('/api/delRole?rid='+rid+"&aid="+this.$store.state.aid).then(function (e) {
                        return e.text();
                    }).then( (e)=> {
                        if(e=='ok'){
                            alert('删除成功');
                            this.tableData = this.tableData.filter(e=>{
                                return e.rid != rid;
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