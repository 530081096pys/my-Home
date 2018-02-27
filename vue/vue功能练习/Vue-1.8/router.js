var router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Index,
            children:[
                {path:'',
                components:{
                        left:Left,
                        right:Right,
                    }
                }
            ]
        },

        {
            path:'/quick',
            component:Quick,
        }
    ]
})