/* 用户管理接口 */
import request from '@/utils/request'
import type {
  AllRoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from './type'

enum API {
  // 获取所有用户
  ALL_USER_URL = '/admin/acl/user/',
  // 添加用户
  ADD_USER_URL = '/admin/acl/user/save',
  // 更新用户请求
  UPDATE_USER_URL = '/admin/acl/user/update',
  // 获取角色 & 包含当前用户拥有的职位
  ALL_ROLE_URL = '/admin/acl/user/toAssign/',
  // 分配角色
  SET_ROLE_URL = '/admin/acl/user/doAssignRole/',
  // 用户删除
  REMOVE_USER_URL = '/admin/acl/user/remove/',
  // 批量删除用户
  BATCH_REMOVE_USER_URL = '/admin/acl/user/batchRemove',
}

// 获取用户信息
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request<any, UserResponseData>(
    API.ALL_USER_URL + `${page}/${limit}/?username=${username}`,
  )

// 添加/修改用户
export const reqAddOrUpdateUser = (data: User) => {
  // 更新
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data)
  }
  // 添加
  else {
    return request.post<any, any>(API.ADD_USER_URL, data)
  }
}

// 获取所有职位 以及 包含当前用户拥有的职位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL + userId)

// 发呢撇角色
export const reqSetRole = (data: SetRoleData) =>
  request.post<any, any>(API.SET_ROLE_URL, data)

// 删除某一个用户
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.REMOVE_USER_URL + userId)

// 批量删除
export const reqBatchRemoveUser = (userIdList: number[]) =>
  request.delete(API.BATCH_REMOVE_USER_URL, { data: userIdList })
