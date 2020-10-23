import {
  post,
  get
} from '@/utils/request'

// 接口列表
const API_LISTS = {
  // 管理员相关接口
  admins: 'admin/admins/lists',
  create_admin: 'admin/admins/create',
  delete_admin: 'admin/admins/delete',
  update_password: 'admin/admins/update-password',
  update_status: 'admin/admins/update-status',
  admin_detail:'admin/account/detail',
  admin_update_detail:'admin/account/update-account',
  admin_update_password:'admin/account/update-password',
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
 * 删除管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeDeleteAdmin(data) {
  return post(API_LISTS.delete_admin, data);
}



/**
 * 修改管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeUpdateAdminPassword(data) {
  return post(API_LISTS.update_password, data);
}

/**
 * 修改管理员服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeUpdateAdminStatus(data) {
  return post(API_LISTS.update_status, data);
}


/**
 * 退出登录服务接口
 */
export function ServeGetAdminDetail() {
  return get(API_LISTS.admin_detail);
}



/**
 * 修改当前登录用户信息服务接口
 */
export function ServeUpdateAdminDetail(data) {
  return post(API_LISTS.admin_update_detail,data);
}


/**
 * 修改当前登录用户密码服务接口
 */
export function ServeUpdatePassword(data) {
  return post(API_LISTS.admin_update_password,data);
}



