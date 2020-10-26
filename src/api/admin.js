import {
  post,
  get
} from '@/utils/request'

// 接口列表
const api = {
  // 管理员相关接口
  admins: 'admin/admins/lists', // 获取管理员数据列表接口
  create_admin: 'admin/admins/create',
  delete_admin: 'admin/admins/delete',
  update_password: 'admin/admins/update-password', // 更新指定管理员账号密码接口
  update_status: 'admin/admins/update-status', // 更新指定管理员账号状态接口
  admin_detail: 'admin/account/detail', // 获取当前登录账号个人信息
  admin_update_detail: 'admin/account/update-account', // 修改当前登录账号个人信息
  admin_update_password: 'admin/account/update-password', // 修改当前登录账号密码
}

/**
 * 导出服务接口列表
 */
export const ADMIN_API = api;

/**
 * 获取管理员列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetAdmins(data) {
  return get(api.admins, data);
}

/**
 * 创建管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeCreateAdmin(data) {
  return post(api.create_admin, data);
}

/**
 * 删除管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeDeleteAdmin(data) {
  return post(api.delete_admin, data);
}

/**
 * 修改管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeUpdateAdminPassword(data) {
  return post(api.update_password, data);
}

/**
 * 修改管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeUpdateAdminStatus(data) {
  return post(api.update_status, data);
}

/**
 * 退出登录服务接口
 */
export function ServeGetAdminDetail() {
  return get(api.admin_detail);
}

/**
 * 修改当前登录用户信息服务接口
 */
export function ServeUpdateAdminDetail(data) {
  return post(api.admin_update_detail, data);
}

/**
 * 修改当前登录用户密码服务接口
 */
export function ServeUpdatePassword(data) {
  return post(api.admin_update_password, data);
}