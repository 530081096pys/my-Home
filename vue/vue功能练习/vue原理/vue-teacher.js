class Vue{
    constructor(params){
        if(params.beforeCreate) {
            params.beforeCreate();
        }

        //1.  创建对象并挂载属性
        this.create(params);

        if(params.created){
            params.created();
        }
        //2.  数据和视图的绑定

        if(params.beforeMount){
            params.beforeMount();
        }
        this.mount();
        if(params.mounted){
            params.mounted();
        }
    }

    create(params) {
        var that = this;
        var obj = {};
        for (var i in params.data) {
            obj[i] = {
                get: (function (i) {
                    return function () {
                        return params.data[i];
                    }
                })(i),
                set: (function (i) {
                    return function (val) {

                        if(params.beforeUpdate){
                            params.beforeUpdate();
                        }
                        var all = document.querySelectorAll("[attr=" + i + "]");
                        for (let k = 0; k < all.length; k++) {

                            all[k].innerHTML = val;
                        }
                        params.data[i] = val;

                        if(params.updated){
                            params.updated();
                        }
                    }
                })(i)

            }

        }




        Object.defineProperties(this,obj);

        for(var j in params.methods){
            this[j]=params.methods[j];
        }

        this.el=params.el;
    }

    mount(){

        this.root=document.querySelector(this.el);

        var str=this.root.innerHTML;

        str=str.replace(/'/g,'"').replace(/\n/g,"");

        str=str.replace(/\{\{([^\}]+)\}\}/g,function (a,b) {
            return "<span attr="+b+">'+"+b+"+'</span>"
        });
        console.log(str);
        str=str.replace(/@(([^=]+)="([^"]+)")/g,function(a,b){
            return "uek-"+b
        })
        console.log(str);

        var fn=new Function("obj","var tpl='';with(obj){tpl+='"+str+"'}\n return tpl");
        this.root.innerHTML=fn(this);

        var objs=document.querySelectorAll("[uek-click]");
        console.log(objs);
        for(var i=0;i<objs.length;i++){
            var fn=objs[i].getAttribute("uek-click");
            console.log(fn);
            var that=this;
            console.log(objs,objs[i].fn)
            objs[i].fn=this[fn];
            console.log(objs[i].fn);

            objs[i].onclick=function(){
                console.log(this.fn);
                console.log(that);
                this.fn.call(that);
            }
        }



    }
}