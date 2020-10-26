import storage from 'store';

import {
  ServeLogin,
  ServeLogout
} from '@/api/auth';

import {
  ACCESS_TOKEN,
  ADMIN_INFO
} from '@/store/mutation-types';

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
        ServeLogin(userInfo).then(res => {
          if (res.code == 200) {
            const result = res.data;
            let adminInfo = res.data.admin_info;
            let time = 7 * 24 * 60 * 60 * 1000;

            storage.set(ACCESS_TOKEN, result.auth.access_token, time)
            storage.set(ADMIN_INFO, {
              username: adminInfo.username,
              avatar: adminInfo.avatar,
            }, time);

            commit('SET_NAME', adminInfo.username);
            commit('SET_AVATAR', adminInfo.avatar);
            commit('SET_TOKEN', result.auth.access_token)
          }

          resolve(res)
        }).catch(error => {
          reject(error)
        });
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
        ServeLogout().then((res) => {
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