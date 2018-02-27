import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        login:'',
        aname:'',
        rid:'',
        levelInfo:'',
        roleInfo:'',
        aid:'',
        able:true,
        UPid:'',
        Sable:false,
        SUPid:'',
    },
    mutations: {
        setLogin (state,val) {
            state.login = val;
        },
        setLevel (state,val) {
            state.levelInfo = val;
        },
        setRole(state,val){
            state.roleInfo = val;
        },
        setAname(state,val){
            state.aname = val;
        },
        setRid(state,val){
            state.rid = val;
        },
        setAid(state,val){
            state.aid = val;
        },
        setAble(state,val){
            state.able = val;
        },
        setUPid(state,val){
            state.UPid = val;
        },
        setSable(state,val){
            state.Sable = val;
        },
        setSUPid(state,val){
            state.SUPid = val;
        }
    }
});
export default store;