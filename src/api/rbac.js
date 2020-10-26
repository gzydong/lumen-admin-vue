import {
  post,
  get
} from '@/utils/request'

// 接口列表
const api = {
  // 角色相关接口
  roles: 'admin/rbac/roles', // 获取角色列表接口
  create_role: 'admin/rbac/create-role', // 创建角色接口
  edit_role: 'admin/rbac/edit-role', // 编辑角色接口
  delete_role: 'admin/rbac/delete-role', // 删除角色接口

  // 权限相关接口
  create_permission: 'admin/rbac/create-permission', // 创建权限接口
  edit_permission: 'admin/rbac/edit-permission', // 编辑权限接口
  permissions: 'admin/rbac/permissions', // 获取权限列表接口
  delete_permission: 'admin/rbac/delete-permission', // 删除权限接口

  // 其它角色权限相关接口
  give_role_permission: 'admin/rbac/give-role-permission', // 角色赋予权限接口
  give_admin_permission: 'admin/rbac/give-admin-permission', // 管理员赋予角色及独立权限接口
  get_role_permission: 'admin/rbac/get-role-permission', // 获取角色的权限列表
  get_admin_permission: 'admin/rbac/get-admin-permission' // 获取管理员的权限列表
}

/**
 * 导出服务接口列表
 */
export const RBAC_API = api

/**
 * 获取角色列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetRoles(data) {
  return get(api.roles, data);
}

/**
 * 创建角色服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeCreateRole(data) {
  return post(api.create_role, data);
}

/**
 * 编辑角色服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeEditRole(data) {
  return post(api.edit_role, data);
}

/**
 * 删除角色服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeDeleteRole(data) {
  return post(api.delete_role, data);
}

/**
 * 删除权限服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeCreatePerms(data) {
  return post(api.create_permission, data);
}

/**
 * 删除权限服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeEditPerms(data) {
  return post(api.edit_permission, data);
}

/**
 * 删除权限服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeDeletePerms(data) {
  return post(api.delete_permission, data);
}

/**
 * 获取权限列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetPerms(data) {
  return get(api.permissions, data);
}

/**
 * 赋予角色权限接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGiveRolePerms(data) {
  return post(api.give_role_permission, data);
}

/**
 * 赋予管理员角色及独立权限接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGiveAdminPerms(data) {
  return post(api.give_admin_permission, data);
}

/**
 * 获取角色权限列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetRolePerms(data) {
  return get(api.get_role_permission, data);
}

/**
 * 获取管理员分配角色及接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetAdminPerms(data) {
  return get(api.get_admin_permission, data);
}