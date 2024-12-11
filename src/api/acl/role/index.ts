import request from '@/utils/request'
import type { AllRolesResponseData, PermissionResponseData, Role } from './type'

/* 角色管理 */
enum API {
  // 获取全部职位信息
  ALL_ROLE_URL = '/admin/acl/role/',
  // 添加角色
  ADD_ROLE_URL = '/admin/acl/role/save',
  // 更新职位
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  // 获取角色权限信息
  ALL_PERMISSION_URL = '/admin/acl/permission/toAssign/',
  // 角色分配权限
  SET_PREMISSION_URL = '/admin/acl/permission/doAssign/',
  // 删除角色
  REMOVE_ROLE = '/admin/acl/role/remove/',
}

// 获取所有角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, AllRolesResponseData>(
    API.ALL_ROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )

// 添加/更新职位
export const reqAddOrUpdateRole = (data: Role) => {
  // 更新
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data)
  }
  // 添加
  else {
    return request.post<any, any>(API.ADD_ROLE_URL, data)
  }
}

// 获取角色权限信息
export const reqAllPermissionsofRole = (roleId: number) =>
  request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL + roleId)

// 分配角色权限
export const reqSetPermission = (roleId: number, permissionIdList: number[]) =>
  request.post(
    API.SET_PREMISSION_URL +
      `?roleId=${roleId}&permissionId=${permissionIdList}`,
  )

// 删除角色
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVE_ROLE + roleId)
