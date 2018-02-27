<template>
    <div class="body">
    <div class="login">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

        <el-form-item label="用户名" prop="user">
            <el-input type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>

            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请次输入用户名'));
                }else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '123456',
                    user: 'admin',
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    user: [
                        { validator: validateUser, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        fetch("/api/checkLogin?user="+this.ruleForm2.user+"&pass="+this.ruleForm2.pass).then(function (e) {
                            return e.json();
                        }).then((e)=>{
                            if(e.message=="ok"){
                                this.$store.commit("setLogin","yes");
                                var aname = e.data[0].aname;
                                var rid = e.data[0].rid;
                                var aid = e.data[0].aid;
//                                sessionStorage.login = "a";
                                this.$store.commit('setAname',aname);
                                this.$store.commit('setRid',rid);
                                this.$store.commit('setAid',aid);
                                alert('success');
                                this.$router.push("/");
                            }else{
                                alert("fail");
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
    .body{
        width:100%;
        height: 100vh;
        background-color: #cccccc;
        position: relative;
    }
    .login{
        width:300px;
        height: 200px;
        padding:30px;
        padding-left:0;
        position:absolute;
        top:0;left:0;right:0;bottom:0;
        margin:auto auto;
        border:1px solid #ffffff;
        background-color: #ffffff;
    }
</style>