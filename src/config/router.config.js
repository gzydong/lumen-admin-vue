import {
  BasicLayout
} from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

/**
 *  菜单路由
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
      path: '/system',
      component: RouteView,
      meta: {
        title: '权限管理',
        keepAlive: true,
        icon: 'solution',
      },
      children: [{
        path: '/system/users',
        name: 'system-users',
        component: () => import('@/views/system/SystemUserPage'),
        meta: {
          title: '管理人员',
          keepAlive: false,
        }
      }, {
        path: '/system/roles',
        name: 'system-roles',
        component: () => import('@/views/system/SystemRolePage'),
        meta: {
          title: '角色管理',
          keepAlive: false
        }
      }, {
        path: '/system/menus',
        name: 'system-menus',
        component: () => import('@/views/system/SystemMenuPage'),
        meta: {
          title: '菜单管理',
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
  },
  {
    path: '*',
    meta: {
      title: '404页面不存在'
    },
    component: () => import('@/views/exception/404'),
  }
];