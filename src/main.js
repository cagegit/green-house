import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible'   //移动端布局框架
import jsonp from 'jsonp';
import VueRx from 'vue-rx';

Vue.prototype.$jsonp= jsonp;
Vue.config.productionTip = false;
Vue.use(VueRx);
// 路由变化更新tabNum
router.beforeEach((to, from,next) => {
    // //console.log('router change from:'+from.path +', to:'+to.path);
    if (store.state.token) {// 判断是否登录
        const path = to.path || '';
        if(path.indexOf('/monitor')>=0) {
            store.dispatch('changeTab',0);
        } else if(path.indexOf('/control')>=0) {
            store.dispatch('changeTab',1);
        } else if(path.indexOf('/warning')>=0) {
            store.dispatch('changeTab',2);
        } else if(path.indexOf('/findings')>=0) {
            store.dispatch('changeTab',3);
        } else if(path.indexOf('/about')>=0) {
            store.dispatch('changeTab',4);
        } else {
            store.dispatch('changeTab',0);
        }
        next();
    } else {// 没登录则跳转到登录界面
        if(to.path.indexOf('login')>=0){//如果是登录页面路径，就直接next()
            next();
        }else{//不然就跳转到登录；
            next({
                path:'/login',
                replace:true
            });
        }
    }
});
Vue.prototype.$eventHub = new Vue();// 设置全局$emit $on

let vueIns = null;
if(process.env.NODE_ENV === 'production') {
    const deviceReady = function() {
        vueIns = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
        window.open = cordova.InAppBrowser.open; // 替换 window.open方法
    };
    document.addEventListener("deviceready", deviceReady, false);
} else {
    vueIns = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
}
// 网络断开检测
const offlineCallback = function() {
    log('off line!');
    if(store.state.token) {
        vueIns && vueIns.$router.replace('/404');
    }
};
const onLine = function() {
    // Handle the online event
    //console.log('on line');
    if(store.state.token) {
        vueIns &&  vueIns.$router.replace('/monitor/main');
    }
};
document.addEventListener("offline", offlineCallback, false);
document.addEventListener("online", onLine, false);

