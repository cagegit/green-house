import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
    activeTab: 0
};

export default new Vuex.Store({
    state,
    getters: {

    },
    mutations: {
       changeTab(state, num) {
             state.activeTab = num;
       }
    },
    actions: {
        changeTab ({ commit },num) {
            commit('changeTab',num)
        }
    }
})