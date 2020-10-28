// eslint-disable-next-line
import {ServeGetMenus} from '@/api/auth'

// eslint-disable-next-line
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'

// 前端路由表
export const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,

  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),

  'Analysis': () => import(/* webpackChunkName: "error" */ '@/views/dashboard/Analysis'),
  'SystemMenuPage': () => import(/* webpackChunkName: "error" */ '@/views/system/SystemMenuPage'),
  'SystemRolePage': () => import(/* webpackChunkName: "error" */ '@/views/system/SystemRolePage'),
  'SystemUserPage': () => import(/* webpackChunkName: "error" */ '@/views/system/SystemUserPage'),

  'component':() => import('@/views/other/component'),
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

// 根级菜单
const rootRouter = {
  name: 'app',
  path: '/',
  component: BasicLayout,
  redirect: '/index',
  meta: {
    title: '首页'
  },
  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    ServeGetMenus().then(res => {
      if(res.code == 200){
        const menus = res.data.menus
        const menuNav = []
        rootRouter.children = filterAsyncRouter(menus)
        menuNav.push(rootRouter)
  
        let routers = menuNav
        routers.push(notFoundRouter)
        resolve(routers)
      }else{
        resolve([])
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
      if (route.component === 'RouteView') {
        route.component = RouteView
      } else {
        if(route.target){
          delete route.component


        }else{
          route.component = constantRouterComponents[route.component]
        }        
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (constantRouterComponents[view]) || (() => import(`@/views/${view}`))
}