import {
  post,
  get
} from '@/utils/request';

const API_LISTS = {
  login: 'admin/auth/login',
  logout: 'admin/auth/logout',
  auth_menus:'admin/auth/menus'
}

/**
 * 登录服务接口
 * 
 * @param data 请求数据
 * @returns {*}
 */
export function ServeLogin(data) {
  return post(API_LISTS.login, data);
}

/**
 * 退出登录服务接口
 */
export function ServeLogout() {
  return post(API_LISTS.logout);
}

/**
 * 获取授权菜单服务接口
 */
export function ServeGetMenus() {
  return get(API_LISTS.auth_menus);
}

/**
 * 导出服务接口列表
 */
export const AUTH_API = API_LISTS