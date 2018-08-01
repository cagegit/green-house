import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Monitor from './views/Monitor.vue'
import Ad from './views/Ad.vue'
Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/',
          redirect:'/monitor'
      },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/monitor',
      name: 'monitor',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Monitor,
      children: [
          {
              path:'/',
              redirect:'ad'
          },
          {
              path: 'ad',
              name: 'ad',
              component: () => import('./views/Ad.vue')
          },
          {
              path: 'main',// 监测主页面
              name: 'main',
              component: () => import('./views/monitor/Main.vue')
          },
          {
              path: 'ssjc',// 实时监测页面
              name: 'ssjc',
              component: () => import('./views/monitor/Ssjc.vue')
          },
          {
              path: 'sbkz',// 设备控制页面
              name: 'sbkz',
              component: () => import('./views/monitor/Sbkz.vue')
          },
          {
              path: 'lsqx',// 历史曲线页面
              name: 'lsqx',
              component: () => import('./views/monitor/Lsqx.vue')
          },
          {
              path: 'ssxx',// 设施信息页面
              name: 'ssxx',
              component: () => import('./views/monitor/Ssxx.vue')
          }
      ]
    }
  ]
})
