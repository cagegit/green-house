import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible.js'   //移动端布局框架
// import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';
//
// Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
