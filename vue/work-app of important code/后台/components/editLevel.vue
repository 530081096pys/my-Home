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
                lname1:'',
                lnum1:'',
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
        mounted(){
           /* var lid = this.$route.params.id;
            fetch('/api/editLevel/'+lid).then(function (e) {
                return e.json();
            }).then((e)=>{
                console.log(e);
                this.ruleForm2.lname = e.data[0].lname;
                this.ruleForm2.lnum = e.data[0].lnum;
                this.lname1 = e.data[0].lname;
                this.lnum1 = e.data[0].lnum;
            })
            console.log(lid);*/
           var le = this.$store.state.levelInfo;
           this.ruleForm2.lname = le.lname;
           this.ruleForm2.lnum= le.lnum;
           this.lname1 = le.lname;
           this.lnum1 = le.lnum;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       if(!(this.lname1 == this.ruleForm2.lname && this.lnum1==this.ruleForm2.lnum)){
                           var send = "lid="+this.$route.params.id+"&lname="+this.ruleForm2.lname + "&lnum="+this.ruleForm2.lnum;
                           fetch("/api/editLevelCon?"+send).then(function (e) {
                               return e.text();
                           }).then((e)=> {
                               console.log(this);
                               if(e=='ok'){
                                   alert('success');
                                   this.$router.push('/levelShow');
                               }else{
                                   alert('fail');
                               }
                           })
                       }else{
                           alert('没有变动')
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