import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
    activeTab: 0,
    fxType:0,// 0: 周，1：月
    fxWeek: [],
    fxMonth: []
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
       }
    },
    actions: {
        changeTab ({ commit },num) {
            commit('changeTab',num)
        },
        fxAction({ commit }, {type,value}) {
            commit('changeFx',{type,value});
        }
    }
})