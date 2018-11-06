import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible'   //移动端布局框架
import jsonp from 'jsonp';
import VueRx from 'vue-rx';
import VueTouch from 'vue-touch'
import {Toast} from 'vant';
Vue.use(Toast);
Vue.use(VueTouch, {name: 'v-touch'});

VueTouch.config.swipe = {
    threshold: 100, //手指左右滑动距离
    direction: 'horizontal'
};
if(process.env.NODE_ENV !== 'production') {
    window.$store = store;
}
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
let vueIns = null;
if(process.env.NODE_ENV === 'production') {
    // 网络断开检测
    const offlineCallback = function() {
        if(store.state.token) {
            vueIns && vueIns.$router.replace('/404');
        }
    };
    const onLine = function() {
        //console.log('on line');
        if(store.state.token) {
            vueIns &&  vueIns.$router.replace('/monitor/main');
        }
    };
    const exitApp = function() {
        navigator.app.exitApp();
    };
    const onBackKeyDown = function(e) {
        e.preventDefault();
        const curRoute = vueIns.$route.path;
        if(curRoute==='/monitor/main' || curRoute==='/about/usermess' || curRoute==='/login'){
            Toast('再按一次退出APP');
            document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
            document.addEventListener("backbutton", exitApp, false);//绑定退出事件
            // 3秒后重新注册
            setTimeout(function() {
                document.removeEventListener("backbutton", exitApp, false); // 注销返回键
                document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
            }, 3000);
        } else {
            navigator.app.backHistory();
        }
    };
    const deviceReady = function() {
        vueIns = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
        // 重置window.open 方法
        window.open = cordova.InAppBrowser.open; // 替换 window.open方法
        // 设置android的状态栏颜色
        if (cordova.platformId === 'android') {
            StatusBar.backgroundColorByHexString("#F5F7F9");//#95abc0
        }
        // 锁定竖屏
        if(screen.orientation) {
            screen.orientation.lock('portrait');
        }
        // 监听返回按钮
        document.addEventListener("backbutton", onBackKeyDown, false);
        document.addEventListener("offline", offlineCallback, false);
        document.addEventListener("online", onLine, false);
    };
    document.addEventListener("deviceready", deviceReady, false);
} else {
    vueIns = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
}

