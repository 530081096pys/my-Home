import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        login:'',
        name:'',
        logid:'',
        uid:'',
        uname:'',
        title:'',
        con:"",
    },
    mutations: {
        setLogin (state,val) {
            state.login = val;
        },
        setLogid(state,val){
            state.logid = val;
        },
        setName(state,val){
            state.name = val;
        },
        setUid(state,val){
            state.uid = val;
        },
        setUname(state,val){
            state.uname = val;
        },
        setTitle(state,val){
            state.title = val;
        },
        setCon(state,val){
            state.con = val;
        }
    }
});
export default store;