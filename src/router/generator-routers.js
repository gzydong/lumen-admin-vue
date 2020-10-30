import {
  ServeGetMenus
} from '@/api/auth'

import {
  BasicLayout,
  BlankLayout,
  PageView,
  RouteView
} from '@/layouts'

/**
 * 前端路由表
 */
export const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,

  '403': () => import('@/views/exception/403'),
  '404': () => import('@/views/exception/404'),
  '500': () => import('@/views/exception/500'),

  'Analysis': () => import('@/views/dashboard/Analysis'),
  'SystemMenuPage': () => import('@/views/system/SystemMenuPage'),
  'SystemRolePage': () => import('@/views/system/SystemRolePage'),
  'SystemUserPage': () => import('@/views/system/SystemUserPage'),

  'component': () => import('@/views/other/component'),
}

/**
 * 前端未找到页面路由（固定不用改）
 */
const notFoundRouter = {
  path: '*',
  component: () => import('@/views/exception/404'),
  hidden: true
}

/**
 * 根级菜单
 */
const rootRouter = {
  path: '/',
  name: '/',
  component: BasicLayout,
  redirect: '/index',
  meta: {
    title: '控制台',
    keepAlive: false,
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
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    ServeGetMenus().then(res => {
      if (res.code == 200) {
        const routers = []
        rootRouter.children.push(...filterAsyncRouter(res.data.menus))
        routers.push(rootRouter)
        routers.push(notFoundRouter)
        resolve({
          routers,
          perms: res.data.perms
        })
      } else {
        resolve({
          routers: [],
          perms: []
        })
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.target) {
        delete route.component
      } else {
        route.component = constantRouterComponents[route.component]
      }
    }

    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }

    return true
  })
}

// 路由懒加载
export const loadView = (view) => {
  return (constantRouterComponents[view]) || (() => import(`@/views/${view}`))
}