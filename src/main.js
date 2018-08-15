import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible/flexible.js'   //移动端布局框架


Vue.config.productionTip = false;
window.$store = store;
// 路由变化更新tabNum
router.beforeEach((to, from,next) => {
    // console.log('router change from:'+from.path +', to:'+to.path);
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
});
Vue.prototype.$eventHub = new Vue();// 设置全局$emit $on
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
