import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import List from '@/components/list'
import Phone from '@/components/phone'
import SRlogs from '@/components/SRlogs'
import Logs from '@/components/logs'
import Write from '@/components/write'
import Readlogs from '@/components/readlogs'
import GetUser from '@/components/getUser'
import Login from '@/components/login'
import Home from '@/components/home'
import Pass from '@/components/pass'
import Reg from "@/components/reg"

Vue.use(Router)

export default new Router({
    linkActiveClass:'activeColor',
    routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
        {
          path:'/login',
          component:Login,
        },
        {
            path:'/reg',
            component:Reg,
        },
        {
          path:'/home',
          component:Home,
            children:[
                {
                    path:'/pass',
                    component:Pass,
                }
            ]
        },
      {
        path:'/list/:nid',
          component:List,
      },
      {
        path:"/phone",
          component:Phone,
      },
      {
        path:'/logs',
          component:Logs,
          children:[
              {
                path:'',
                  component:SRlogs,
                  children:[
                      {
                        path:'',
                          direction:'/readlogs/send',
                          component:Readlogs,
                      },
                      {
                        path:'/readlogs/:type',
                          component:Readlogs
                      },
                  ]
              },
              {
                path:'/write',
                  component:Write,
              },
              {
                  path:'/getUser',
                  component:GetUser,
              },
              {path:'/lista/:pid',component:GetUser},


          ]
      }
  ]
})
