<template>
    <!--<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

        <el-form-item label="管理员名称" prop="aname">
            <el-input type="text" v-model="ruleForm2.aname" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="管理员密码" prop="apass">
            <el-input type="password" v-model="ruleForm2.apass" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="管理员头像" prop="photo">
            <el-input type="text" v-model="ruleForm2.photo" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="管理员角色" prop="rid">
            <el-input type="text" v-model="ruleForm2.rid" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>-->
    <div>
        <form action="javascript:;">
            <div class="form-group">
                <label for="exampleInputEmail1">管理员名称</label>
                <input type="text" class="form-control" id="exampleInputEmail1" placeholder="管理员名称" v-model="aname">
            </div>

            <div class="checkbox" v-for="item in box">
                <el-radio v-model="arid" :label="item.rid">{{item.rname}}</el-radio>
            </div>

            <span style="margin-top: 20px;display: block;">头像上传:</span>
            <el-upload
                    class="avatar-uploader"
                    action="/api/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <button type="submit" class="btn btn-default" @click="submit">Submit</button>
        </form>
    </div>

</template>

<script>
    require('../assets/bootstrap/css/bootstrap.min.css')
    /*export default {
        name: 'login',
        data() {
            var validateAname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateApass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请次输入用户名'));
                }else {
                    callback();
                }
            };
            var validatePhoto = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请次输入用户名'));
                }else {
                    callback();
                }
            };
            var validateRid = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请次输入用户名'));
                }else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    aname: '',
                    apass: '',
                    photo: '',
                    rid: '',
                },
                rules2: {
                    aname: [
                        { validator: validateAname, trigger: 'blur' }
                    ],
                    apass: [
                        { validator: validateApass, trigger: 'blur' }
                    ],
                    photo:[
                        { validator: validatePhoto, trigger:'blur'}
                    ],
                    rid:[
                        { validator: validateRid, trigger:'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

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
    }*/
    export default {
        data() {
            return {
                imageUrl: '',
                radio:'',
                box:[],
                aname:'',
                arid:'',
                photo:''
            };
        },
        mounted(){
            fetch('/api/showManager').then(function(e){
                return e.json();
            }).then((e)=>{
                this.box = e;
            })
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.photo = file.response;
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submit(){
                var photo = this.photo;
                var aname = this.aname;
                var rid = this.arid;
                var apass = '123456';
                var body="photo="+photo+"&aname="+aname+"&rid="+rid+"&apass="+apass;
                fetch('/api/addManager',{
                    method:'post',
                    headers:{
                      'content-type':"application/x-www-form-urlencoded"
                    },
                    body:body,
                }).then(function (e) {
                    return e.text();
                }).then(function (e) {
                    if(e=='ok'){
                        alert('success');
                    }else{
                        alert('fail');
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>