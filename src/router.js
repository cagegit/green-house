import Vue from 'vue'
import Router from 'vue-router'
import Monitor from './views/Monitor.vue'
import Login from './views/Login.vue'
Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/monitor'
      },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
      },
      {
          path: '/monitor',
          name: 'monitor',
          component: Monitor,
          children: [
              {
                  path: '/',
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
              },
              {
                  path: 'fjsb',// 风机设备控制页
                  name: 'fjsb',
                  component: () => import('./views/monitor/Fjsb.vue')
              },
              {
                  path: 'fjs',// 风机组控制页
                  name: 'fjs',
                  component: () => import('./views/monitor/Fjs.vue')
              },
              {
                  path: 'fuxuan',// 重复选择页
                  name: 'fuxuan',
                  component: () => import('./views/monitor/Fuxuan.vue')
              },
          ]
      }, {
          path: '/control',
          name: 'control',
          component: () => import('./views/Control.vue')
      }, {
          path: '/findings',
          name: 'findings',
          component: () => import('./views/Findings.vue'),
          children: [
              {
                  path: '/',
                  name: 'message',
                  component: () => import('./views/findings/Message.vue')
              },
              {
                  path: 'message',// 消息页面
                  name: 'message',
                  component: () => import('./views/findings/Message.vue')
              },
              {
                  path: 'training',// 培训页面
                  name: 'training',
                  component: () => import('./views/findings/Training.vue')
              },
          ]
      }, {
          path: '/about',
          name: 'about',
          component: () => import('./views/About.vue'),
          children: [
              {
                  path: '/',
                  name: 'userMess',
                  component: () => import('./views/about/UserMess.vue')
              },
              {
                  path: 'usermess',// 消息页面
                  name: 'usermess',
                  component: () => import('./views/about/UserMess.vue')
              },
              {
                  path: 'modifypassword',// 修改密码
                  name: 'modifypassword',
                  component: () => import('./views/about/ModifyPassword.vue')
              }, {
                  path: 'aboutme',// 关于
                  name: 'aboutme',
                  component: () => import('./views/about/AboutMe.vue')
              }
          ]
      }, {
          path: '/warning',   //告警
          name: 'warning',
          component: () => import('./views/Warning.vue'),
          children: [
            {
                path:'',
                name: 'warning',
                component: () => import('./views/warning/CurrentWarn.vue')
            },
            {
                path:'currentwarn',//当前警告
                name: 'currentwarn',
                component: () => import('./views/warning/CurrentWarn.vue')
            },
            {
                path:'historywarn',//历史警告
                name: 'historywarn',
                component: () => import('./views/warning/HistoryWarn.vue')
            },
            {
                path: 'warningDetail',// 告警详情页
                name: 'warningDetail',
                component: () => import('./views/warning/WarningDetail.vue')
            }
        ]
      }
  ]
})
