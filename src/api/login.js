import request from '@/utils/request'

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout'
}

/**
 * login func
 * 
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  });
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}