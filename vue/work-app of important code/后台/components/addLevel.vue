<template>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

                <el-form-item label="权限名称" prop="lname">
                    <el-input type="text" v-model="ruleForm2.lname" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="权限代码" prop="lnum">
                    <el-input type="text" v-model="ruleForm2.lnum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>

                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
</template>

<script>
    export default {
        name: 'login',
        data() {
            var validateLname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateLnum = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请次输入用户名'));
                }else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    lname: '',
                    lnum: '',
                },
                rules2: {
                    lname: [
                        { validator: validateLname, trigger: 'blur' }
                    ],
                    lnum: [
                        { validator: validateLnum, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    var that = this;
                    if (valid) {
                        var query = "lname="+this.ruleForm2.lname+"&lnum="+this.ruleForm2.lnum
                       var ajax = new XMLHttpRequest();
                        ajax.onload = function () {
                            if(ajax.response =="ok"){
                                alert('success');
                                that.ruleForm2.lname = '';
                                that.ruleForm2.lnum = "";
                                that.$router.push('/levelShow');
                            }else{
                                alert('fail')
                            }
                        }
                       ajax.open("GET","/api/addLevel?"+query);
                       ajax.send();
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