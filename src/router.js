import Vue from 'vue'
import Router from 'vue-router'
import Monitor from './views/Monitor.vue'
import Err404 from './views/error/404.vue'
import Err500 from './views/error/500.vue'
Vue.use(Router);


export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/monitor'
      },
      {
          path: '/login',
          component:  () => import('./views/Login.vue'),
          children: [
              {
                  path: '/',
                  name: 'login',
                  component: () => import('./views/login/LoginPage.vue')
              },
              {
                  path: 'findPassword',// 找回密码
                  name: 'findPassword',
                  component: () => import('./views/login/FindPassword.vue')
              },
              {
                  path: 'resetPassword',// 重置密码
                  name: 'resetPassword',
                  component: () => import('./views/login/ResetPassword.vue')
              }
          ]
      },
      {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
      },
      {
          path: '/monitor',
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
                  component: () => import('./views/monitor/Fjsb.vue'),
                  props: true
              },
              {
                  path: 'fjs',// 风机组控制页
                  name: 'fjs',
                  component: () => import('./views/monitor/Fjs.vue'),
                  props:true
              },
              {
                  path: 'fuxuan',// 重复选择页
                  name: 'fuxuan',
                  component: () => import('./views/monitor/Fuxuan.vue')
              },
              {
                  path: 'dp-name',// 修改大棚名称
                  name: 'dp-name',
                  component: () => import('./views/monitor/DpName.vue'),
                  props: true
              },
              {
                  path: 'dp-type',// 修改作物种类
                  name: 'dp-type',
                  component: () => import('./views/monitor/DpType.vue'),
                  props: true
              },
              {
                  path: 'dp-size',// 修改大棚尺寸
                  name: 'dp-size',
                  component: () => import('./views/monitor/DpSize.vue'),
                  props: true
              }
          ]
      }, {
          path: '/control',
          name: 'control',
          component: () => import('./views/Control.vue')
      }, {
          path: '/findings',
          component: () => import('./views/Findings.vue'),
          children: [
              {
                  path: '/',
                  name: 'message',
                  component: () => import('./views/findings/Message.vue')
              },
              {
                  path: 'message',// 消息页面
                  name: 'msg',
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
              },  {
                  path: 'modifyaddr',// 修改地址
                  name: 'modifyaddr',
                  component: () => import('./views/about/ModifyAddr.vue'),
                  props: true
              }
          ]
      }, {
          path: '/warning',   //告警
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
      },
      {
          path:'/404',
          name:'404',
          component: Err404
      },
      {
          path:'/500',
          name:'500',
          component: Err500
      },
      {
          path: '/*',
          redirect: '/monitor/main'
      }
  ]
})
