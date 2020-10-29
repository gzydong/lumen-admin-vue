import {
  BasicLayout
} from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

/**
 *  异步路由
 */
export const asyncRouterMap = [{
  path: '/',
  name: '/',
  component: BasicLayout,
  redirect: '/index',
  meta: {
    title: '主页',
  },
  children: [{
    path: '/index',
    name: 'index',
    component: () => import('@/views/dashboard/Analysis'),
    meta: {
      icon: 'fund',
      title: '控制台',
      keepAlive: false,
    }
  }]
}];

/**
 * 基础路由
 * 
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/login',
    name: 'login',
    meta: {
      title: '授权登录'
    },
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/account',
    component: BasicLayout,
    children: [{
      path: '/account/settings',
      name: 'settings',
      component: () => import('@/views/account/settings/Index'),
      meta: {
        title: '个人设置'
      },
      redirect: '/account/settings/base',
      children: [{
          path: '/account/settings/base',
          name: 'BaseSettings',
          component: () => import('@/views/account/settings/BaseSetting'),
          meta: {
            title: '基本设置'
          }
        },
        {
          path: '/account/settings/security',
          name: 'SecuritySettings',
          component: () => import('@/views/account/settings/Security'),
          meta: {
            title: '安全设置'
          }
        },
        {
          path: '/account/settings/password',
          name: 'SettingPassword',
          component: () => import('@/views/account/settings/SettingPassword'),
          meta: {
            title: '设置密码'
          }
        },
      ]
    }]
  }
];