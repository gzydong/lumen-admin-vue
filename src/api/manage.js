import request from '@/utils/request'

const api = {
  createAdmin: '/admins/create',
  user: '/admins/lists',
  role: '/rbac/roles',
  permission: '/permission',
  createRole: '/rbac/create-role',
  editRole: '/rbac/edit-role',
  deleteRole: '/rbac/delete-role',
  createPermission: '/rbac/create-permission',
  editPermission: '/rbac/edit-permission',
  deletePermission: '/rbac/delete-permission',
  giveRolePermission: '/rbac/give-role-permission',
  giveAdminPermission: '/rbac/give-admin-permission',
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

export function getPermissions(parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}