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
            fetch('/api/levelShow').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.Role = e;
            })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var query = "rname="+this.ruleForm2.rname+"&lid="+this.checkRole
                        fetch("/api/addRole?"+query).then(function (e) {
                            return e.text();
                        }).then((e)=>{
                            if(e =="ok"){
                                alert('success');
                                this.ruleForm2.rname="";
                                this.checkRole="";
                                this.$router.push('/roleShow');
                            }else{
                                alert('fail');
                            }
                        })
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