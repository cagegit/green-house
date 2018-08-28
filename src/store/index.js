import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
    token:'',// 登录之后的token
    activeTab: 0,
    fxType:0,// 0: 周，1：月
    fxWeek: [],
    fxMonth: [],
    sbInfo: {
        name: '一号西红柿大棚',
        type: '非转基因西红柿',
        size: '200*800'
    },
    user: {}
};

export default new Vuex.Store({
    state,
    getters: {

    },
    mutations: {
       changeTab(state, num) {
             state.activeTab = num;
       },
       changeFx(state, {type,value}) {
           state.fxType = type;
           if(type===0) {
               state.fxWeek = value;
           } else {
               state.fxMonth = value;
           }
       },
        sbinfo(state, sb) {
           state.sbInfo = Object.assign(state.sbInfo,sb);
        },
        setToken(state, token) {
           state.token = token;
        },
        setUser(state, user) {
           state.user = Object.assign({},user);
        }
    },
    actions: {
        changeTab ({ commit },num) {
            commit('changeTab',num)
        },
        fxAction({ commit }, {type,value}) {
            commit('changeFx',{type,value});
        },
        sbInfoAction({ commit },sb) {
            commit('sbinfo',sb);
        }
    }
})