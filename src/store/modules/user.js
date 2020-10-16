import storage from 'store'
import {
  login,
  logout
} from '@/api/login'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const result = res.data
          storage.set(ACCESS_TOKEN, result.Authentication.access_token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.Authentication.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({
      commit,
      state
    }) {
      let func = () => {
        commit('SET_TOKEN', '')
        storage.remove(ACCESS_TOKEN)
      }

      return new Promise((resolve, error) => {
        logout().then((res) => {
          func();
          resolve()
        }).catch(() => {
          func();
          reject(error)
        });
      })
    }
  }
}

export default user