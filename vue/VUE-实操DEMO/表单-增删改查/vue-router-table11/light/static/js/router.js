
var router = new VueRouter({
    routes:[
        {path:'/',component:Main,children:[
            {path:'/',component:Index},
            {path:'/add',component:Add},
            {path:'/edit/:id',component:Edit},
        ]},
        {path:'/login',component:Login},
        {path:'/reg',component:Reg},
    ]
});

router.beforeEach(function(to,from,next){
    if(to.path =='/login' || to.path == '/reg'){
        next();
    }else{
        if(sessionStorage.login){
           next() ;
        }else{
           router.push('/login');
        }
    }
})