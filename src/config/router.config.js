import { BasicLayout, BlankLayout, PageView } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

/**
 * 
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
    },
    {
      path: '/admins',
      redirect: '/admins/lists',
      component: RouteView,
      meta: {
        title: '权限分配',
        keepAlive: true,
        icon: 'solution',
      },
      children: [{
        path: '/admins/lists',
        name: 'admins',
        component: () => import('@/views/admins/AdminList'),
        meta: {
          title: '管理人员',
          keepAlive: false,
        }
      }, {
        path: '/admins/roles',
        name: 'roles',
        component: () => import('@/views/admins/RolesList'),
        meta: {
          title: '角色管理',
          keepAlive: false,
        }
      }, {
        path: '/admins/permissions',
        name: 'permissions',
        component: () => import('@/views/admins/RuleList'),
        meta: {
          title: '权限管理',
          keepAlive: false,
        }
      }]
    },
    {
      path: '/other',
      name: 'component',
      component: () => import('@/views/other/component'),
      meta: {
        icon: 'tool',
        title: '自定义组件',
      }
    },
    // account
    {
      path: '/account',
      component: RouteView,
      redirect: '/account/settings',
      name: 'account',
      hidden:true,
      meta: {
        title: '个人页',
        icon: 'user',
        keepAlive: true,
        permission: ['user']
      },
      children: [
        {
          path: '/account/settings',
          name: 'settings',
          component: () => import('@/views/account/settings/Index'),
          meta: {
            title: '个人设置',
            hideHeader: true,
            permission: ['user']
          },
          redirect: '/account/settings/base',
          hideChildrenInMenu: true,
          children: [{
              path: '/account/settings/base',
              name: 'BaseSettings',
              component: () => import('@/views/account/settings/BaseSetting'),
              meta: {
                title: '基本设置',
                hidden: true
              }
            },
            {
              path: '/account/settings/security',
              name: 'SecuritySettings',
              component: () => import('@/views/account/settings/Security'),
              meta: {
                title: '安全设置',
                hidden: true
              }
            },
            {
              path: '/account/settings/password',
              name: 'SettingPassword',
              component: () => import('@/views/account/settings/SettingPassword'),
              meta: {
                title: '设置密码',
                hidden: true
              }
            },
          ]
        }
      ]
    }
  ]
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
    path: '*',
    meta: {
      title: '404页面不存在'
    },
    component: () => import('@/views/exception/404'),
  }
];