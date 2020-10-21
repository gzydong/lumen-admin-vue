import {
  post,
  get
} from '@/utils/request'

// 接口列表
const API_LISTS = {
  // 角色相关接口
  roles: '/rbac/roles',                                         // 获取角色列表接口
  createRole: '/rbac/create-role',                              // 创建角色接口
  editRole: '/rbac/edit-role',                                  // 编辑角色接口
  deleteRole: '/rbac/delete-role',                              // 删除角色接口

  // 权限相关接口
  createPermission: '/rbac/create-permission',                  // 创建权限接口
  editPermission: '/rbac/edit-permission',                      // 编辑权限接口
  getPermission: '/rbac/permissions',                           // 获取权限列表接口
  deletePermission: '/rbac/delete-permission',                  // 删除权限接口

  // 其它角色权限相关接口
  giveRolePermission: '/rbac/give-role-permission',             // 角色赋予权限接口
  giveAdminPermission: '/rbac/give-admin-permission',           // 管理员赋予角色及独立权限接口
  getRolePermission: '/rbac/get-role-permission',               // 获取角色的权限列表
  getAdminPermission:'/rbac/get-admin-permission'
}

/**
 * 导出服务接口列表
 */
export const RBAC_API = API_LISTS

/**
 * 获取角色列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetRoles(data){
  return get(API_LISTS.roles, data);
}

/**
 * 创建角色服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeCreateRole(data){
  return post(API_LISTS.createRole, data);
}

/**
 * 编辑角色服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeEditRole(data){
  return post(API_LISTS.editRole, data);
}

/**
 * 删除角色服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeDeleteRole(data){
  return post(API_LISTS.deleteRole, data);
}

/**
 * 删除权限服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeCreatePerms(data){
  return post(API_LISTS.createPermission, data);
}

/**
 * 删除权限服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeEditPerms(data){
  return post(API_LISTS.editPermission, data);
}

/**
 * 删除权限服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeDeletePerms(data){
  return post(API_LISTS.deletePermission, data);
}

/**
 * 获取权限列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetPerms(data){
  return get(API_LISTS.getPermission, data);
}

/**
 * 赋予角色权限接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGiveRolePerms(data){
  return post(API_LISTS.giveRolePermission, data);
}

/**
 * 赋予管理员角色及独立权限接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGiveAdminPerms(data){
  return post(API_LISTS.giveAdminPermission, data);
}

/**
 * 获取角色权限列表服务接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetRolePerms(data){
  return get(API_LISTS.getRolePermission, data);
}


/**
 * 获取管理员分配角色及接口
 * 
 * @param {*} data 请求数据
 */
export function ServeGetAdminPerms(data){
  return get(API_LISTS.getAdminPermission, data);
}

