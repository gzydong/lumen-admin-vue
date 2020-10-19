import request from '@/utils/request'
import {
  post,
  get
} from '@/utils/request'

const api = {
  createAdmin: '/admins/create',
  updatePassword: '/admins/update-password',
  user: '/admins/lists',
  role: '/rbac/roles',
  createRole: '/rbac/create-role',
  editRole: '/rbac/edit-role',
  deleteRole: '/rbac/delete-role',
  createPermission: '/rbac/create-permission',
  editPermission: '/rbac/edit-permission',
  getPermission: '/rbac/permissions',
  deletePermission: '/rbac/delete-permission',
  giveRolePermission: '/rbac/give-role-permission',
  giveAdminPermission: '/rbac/give-admin-permission',
  getRolePermission: '/rbac/get-role-permission'
}

export default api

export function createAdminApi(data) {
  return request({
    url: api.createAdmin,
    method: 'post',
    params: data
  })
}


export function getUserList(parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(data) {
  return request({
    url: api.getPermission,
    method: 'get',
    params: data
  })
}

/**
 * 修改管理员密码接口
 * 
 * @param {*} data 
 */
export function updatePassword(data) {
  return post(api.updatePassword, data);
}

/**
 * 创建管理员接口
 * 
 * @param {*} data 
 */
export function createAdmin(data) {
  return post(api.createAdmin, data);
}


/**
 * 创建角色接口
 * 
 * @param {*} data 
 */
export function createRole(data) {
  return post(api.createRole, data);
}


/**
 * 创建角色接口
 * 
 * @param {*} data 
 */
export function editRole(data) {
  return post(api.editRole, data);
}

/**
 * 创建角色接口
 * 
 * @param {*} data 
 */
export function deleteRole(data) {
  return post(api.deleteRole, data);
}

/**
 * 创建角色接口
 * 
 * @param {*} data 
 */
export function getRolePerms(data) {
  return get(api.getRolePermission, data);
}


export function giveRolePermission(data) {
  return post(api.giveRolePermission, data);
}

export function createPermission(data) {
  return post(api.createPermission, data);
}

