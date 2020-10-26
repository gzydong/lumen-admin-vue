import {
  post,
  get
} from '@/utils/request';

const api = {
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
  return post(api.login, data);
}

/**
 * 退出登录服务接口
 */
export function ServeLogout() {
  return post(api.logout);
}

/**
 * 获取授权菜单服务接口
 */
export function ServeGetMenus() {
  return get(api.auth_menus);
}

/**
 * 导出服务接口列表
 */
export const AUTH_API = api