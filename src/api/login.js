import {
  request,
  post
} from '@/utils/request';

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout'
}

/**
 * 登录接口
 * 
 * @param data 请求数据
 * @returns {*}
 */
export function login(data) {
  return post(userApi.Login, data);
}

/**
 * 退出登录接口
 */
export function logout() {
  return post(userApi.Logout);
}