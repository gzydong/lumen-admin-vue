// eslint-disable-next-line
import {
  BasicLayout
} from '@/layouts'
import {
  bxAnaalyse
} from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'menu.home'
    },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: {
          title: '仪表盘',
          keepAlive: true,
          icon: bxAnaalyse,
        },
        children: [{
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: '分析页',
              keepAlive: false,
            }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: {
              title: '外部链接',
              target: '_blank'
            }
          }
        ]
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/login',
    name: 'login',
    meta: {
      title: '授权登录'
    },
    component: () => import('@/views/user/NewLogin')
  },

  {
    path: '/404',
    meta: {
      title: '404页面不存在'
    },
    component: () => import('@/views/exception/404')
  }
]