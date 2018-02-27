<template>

    <div>
        <span>批量上传</span>
        <el-upload
                class="upload-demo"
                action="/api/upUser"
                :on-success="handleAvatarSuccess"
                :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <h3 style="text-align: center">部门选择</h3>
        <div class="part">
            <router-view></router-view>
        </div>

    <el-form :model="ruleForm2" status-icon  label-width="100px" class="demo-ruleForm">

        <el-form-item label="角色名称" prop="uname" >
            <el-input type="text" v-model="ruleForm2.uname" auto-complete="off" :disabled="able"></el-input>
        </el-form-item>

        <el-form-item label="角色电话" prop="phone">
            <el-input type="text" v-model="ruleForm2.phone" auto-complete="off" :disabled="able"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
    </div>
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
                fileList:[],
                ruleForm2: {
                    uname: '',
                    phone:'',
                },
            };
        },
        mounted(){

        },
        methods: {
            submit(){
                var uname = this.ruleForm2.uname;
                var phone = this.ruleForm2.phone;
                var pid = this.$store.state.UPid;
                var query="uname="+uname+"&phone="+phone+"&pid="+pid;
                fetch('/api/addUser?'+query).then(function (e) {
                    return e.text();
                }).then(function(e){
                    if(e=='ok'){
                        alert('success')
                    }else if(e=='以重复'){
                        alert('重复')
                    }else{
                        alert('fail')
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                var a= res;
                alert(a);
            },
        },
        computed:{
            able(){
                return this.$store.state.able;
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