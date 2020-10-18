import {
  BasicLayout
} from '@/layouts';

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
        title: '权限管理',
        keepAlive: true,
        icon: 'solution',
      },
      children: [{
        path: '/admins/lists',
        name: 'admins',
        component: () => import('@/views/admins/AdminList'),
        meta: {
          title: '管理员',
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
        component: () => import('@/views/admins/AdminList'),
        meta: {
          title: '权限设置',
          keepAlive: false,
        }
      }]
    },
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