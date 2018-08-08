import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible/flexible.js'   //移动端布局框架


Vue.config.productionTip = false;
window.$store = store;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
