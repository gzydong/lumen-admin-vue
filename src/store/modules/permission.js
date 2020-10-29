/**
 * 向后端请求用户的菜单，动态生成路由
 */
import {
  constantRouterMap
} from '@/config/router.config'
import {
  generatorDynamicRouter
} from '@/router/generator-routers'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    perms: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_PERMS: (state, routers) => {
      state.perms = routers
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }) {
      return new Promise(resolve => {
        generatorDynamicRouter().then(data => {
          commit('SET_ROUTERS', data.routers)
          commit('SET_PERMS', data.perms)
          resolve(data.routers)
        })
      })
    }
  }
}

export default permission