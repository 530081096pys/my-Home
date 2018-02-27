<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>管理员操作</span>
                    </template>
                    <el-menu-item-group>
                        <!--<template slot="title">分组一</template>-->
                        <el-menu-item index="1-1">
                            <router-link to="/managerShow" exact>查看管理员</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/addManager" exact>添加管理员</router-link>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>角色操作</span>
                    </template>
                    <el-menu-item-group>
                        <!--<template slot="title">分组一</template>-->
                        <el-menu-item index="1-1">
                            <router-link to="/roleShow" exact>查看角色</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/addRole" exact>添加角色</router-link>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限设置</span>
                    </template>
                    <el-menu-item-group>
                        <!--<template slot="title">分组一</template>-->
                        <el-menu-item index="1-1">
                            <router-link to="/levelShow" exact>查看权限</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/addLevel" exact>添加权限</router-link>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>部门设置</span>
                    </template>
                    <el-menu-item-group>
                        <!--<template slot="title">分组一</template>-->
                        <el-menu-item index="1-1">
                            <router-link to="/partShow" exact>查看部门</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/addPart" exact>添加部门</router-link>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户操作</span>
                    </template>
                    <el-menu-item-group>
                        <!--<template slot="title">分组一</template>-->
                        <el-menu-item index="1-1">
                            <router-link to="/userShow" exact>查看用户</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/addUser" exact>添加用户</router-link>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name:'Aside',
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active{
    color:red;
}
</style>