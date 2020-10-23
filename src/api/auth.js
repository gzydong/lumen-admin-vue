import {
  post
} from '@/utils/request';

const API_LISTS = {
  login: 'admin/auth/login',
  logout: 'admin/auth/logout'
}

/**
 * 登录服务接口
 * 
 * @param data 请求数据
 * @returns {*}
 */
export function login(data) {
  return post(API_LISTS.login, data);
}

/**
 * 退出登录服务接口
 */
export function logout() {
  return post(API_LISTS.logout);
}






/**
 * 导出服务接口列表
 */
export const AUTH_API = API_LISTS