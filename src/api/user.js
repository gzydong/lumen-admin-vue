import {
  post,
  get
} from '@/utils/request'

// 接口列表
const API_LISTS = {
  // 管理员相关接口
  admins: '/admins/lists',
  create_admin: '/admins/create',
  update_password: '/admins/update-password',
}

/**
 * 导出服务接口列表
 */
export const USER_API = API_LISTS

/**
 * 获取管理员列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetAdmins(data) {
  return get(API_LISTS.admins, data);
}

/**
 * 创建管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeCreateAdmin(data) {
  return post(API_LISTS.create_admin, data);
}

/**
 * 修改管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeUpdateAdminPassword(data) {
  return post(API_LISTS.update_password, data);
}