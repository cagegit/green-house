import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
    token:'',// 登录之后的token
    pid:'',// 当前pid
    propertys: null, // 当前ctrl的propertys
    activeTab: 0,
    fxType:'day',// day: 天，week：周,month: 月
    fxWeek: [],
    fxMonth: [],
    controlHand: false, // 手动控制
    controlAuto:false, // 自动控制
    sbInfo: {
        name: '一号西红柿大棚',
        type: '非转基因西红柿',
        size: '200*3*1000',
        area: '北京市北京市海淀区'
    },
    user: {},
    aboutMes:{},
    warnings: 0,
    relations: [], // 图片对应关系
    tasks: [],
    ctrlId: 0,
    chartData: []
};

export default new Vuex.Store({
    state,
    getters: {},
    mutations: {
       changeTab(state, num) {
             state.activeTab = num;
       },
       changeFx(state, {type,value}) {
           state.fxType = type;
           if(type==='week') {
               state.fxWeek = value;
           } else if(type==='month') {
               state.fxMonth = value;
           } else {
               state.fxWeek = [];
               state.fxMonth = [];
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
        },
        setPid(state, id) {
           state.pid = id;
        },
        setPropertys(state, pro) {
           state.propertys = pro;
        },
        setAboutMes(state, aboutMes){
          state.aboutMes = aboutMes;
        },
        setControlHand(state, check) {
           state.controlHand = check;
        },
        setControlAuto(state, check) {
            state.controlAuto = check;
        },
        setWarning(state, num) {
           state.warnings += num;
        },
        setRelations(state, relations) {
           state.relations = relations;
        },
        setTaskList(state,tasks) {
           state.tasks = tasks;
        },
        setCtrlId(state,ctrlId){
           state.ctrlId = ctrlId;
        },
        setChartData(state,data) {
           state.chartData = data;
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