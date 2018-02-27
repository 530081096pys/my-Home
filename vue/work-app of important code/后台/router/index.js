import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/components/container'
import ManagerShow from "../components/managerShow.vue"
import Login from "@/components/login"
import AddLevel from "@/components/addLevel"
import LevelShow from "@/components/levelShow"
import AddRole from "@/components/addRole"
import RoleShow from "@/components/roleShow"
import EditLevel from "@/components/editLevel"
import AddManager from "@/components/addManager"
import EditRole from "@/components/editRole"
import EditPass from "@/components/editPass"
import AddPart from "@/components/addPart"
import PartShow from "@/components/partShow"
import EditPart from "@/components/editPart"
import EditManager from "@/components/editManager"
import AddUser from "@/components/addUser"
import UserShow from "@/components/userShow"
import Table from "@/components/table"
import UserPart from "@/components/userPart"
import UserPartS from "@/components/userPartS"

Vue.use(Router)

 var obj = new Router({
     linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container,
        children:[
            {
                path:"/managerShow",
                name:"managerShow",
                component:ManagerShow,
            },
            {
                path:"/addLevel",
                name:'AddLevel',
                component:AddLevel,
            },
            {
                path:'/levelShow',
                name:'LevelShow',
                component:LevelShow,
            },
            {
                path:'/addRole',
                name:'AddRole',
                component:AddRole,
            },
            {
                path:'/roleShow',
                name:'RoleShow',
                component:RoleShow,
            },
            {
                path:'/editLevel/:id',
                component:EditLevel,
            },
            {
                path:'/addManager',
                component:AddManager,
            },
            {
                path:'/editRole',
                component:EditRole,
            },
            {
                path:'/editPass/:id',
                component:EditPass,
            },
            {
                path:'/addPart',
                component:AddPart,
            },
            {
                path:'/partShow',
                component:PartShow,
            },
            {
                path:'/editPart',
                component:EditPart,
            },
            {
                path:'/editManager',
                component:EditManager,
            },
            {
                path:'/userShow',
                component:UserShow,
                children:[
                    {path:'',component:UserPartS},
                    {path:'/listS/:pid',component:UserPartS}
                ]
            },
            {
                path:'/addUser',
                component:AddUser,
                children:[
                    {path:'',component:UserPart},
                    {path:'/list/:pid',component:UserPart}
                ]
            },

        ]
    },
      {
          path:"/login",
          name:'login',
          component:Login,
      },
      {
          path:'/table',
          component:Table,
      }
  ]
});
obj.beforeEach(function (to,from,next) {
        if(to.path == "/login"){
            next();
        }else{
            /*if(sessionStorage.login){
                next();
            }else{
                next("/login");
            }*/
            if(obj.app.$store && obj.app.$store.state.login=="yes"){
                next();
            }else{
                next('/login');
            }
        }
});
export default obj;
