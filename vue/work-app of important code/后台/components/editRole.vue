<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

        <el-form-item label="角色名称" prop="rname">
            <el-input type="text" v-model="ruleForm2.rname" auto-complete="off"></el-input>
        </el-form-item>

        <el-checkbox-group
                v-model="checkRole"
        >
            <el-checkbox v-for="item in Role" :label="item.lnum" :key="item.lid">{{item.lname}}</el-checkbox>
        </el-checkbox-group>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'addRole',
        data() {
            var validateRname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请次输入角色名称'));
                }else {
                    callback();
                }
            };
            return {
                checkRole: [],
                Role: [],
                rname1:'',
                Role1:[],
                ruleForm2: {
                    rname: '',
                },
                rules2: {
                    rname: [
                        { validator: validateRname, trigger: 'blur' }
                    ]
                }
            };
        },
        mounted(){
            var info = this.$store.state.roleInfo;
            this.ruleForm2.rname = info.rname;
            this.rname1 = info.rname;
            for(var i = 0;i<info.level.length;i++){
                this.Role.push(info.level[i]);
            };
            for(var j=0;j<info.lid.length;j++){
                this.checkRole.push(info.lid[j].lid);
                this.Role1.push(info.lid[j].lid);
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var rid = this.$store.state.roleInfo.rid;
                        var rname = this.ruleForm2.rname;
                        var lid = this.checkRole.join(",");
                        var vlid = this.Role1.join(",");
                        if(!(this.rname1 == rname && lid == vlid)){
                            fetch('/api/editRole?rid='+rid+"&rname="+rname+"&lid="+lid).then(function (e) {
                  return e.text();
                            }).then(function (e) {
                                if(e=='ok'){
                                    alert('成功')
                                }else{
                                    alert('fail')
                                }
                            })
                        }else{
                            alert('数据没有改变');
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>