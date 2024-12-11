import request from '@/utils/request'
import type { MenuParams, MenuPermissionResponseData } from './type'

/* 菜单管理接口 */
enum API {
  // 获取全部菜单
  ALL_MENU_URL = '/admin/acl/permission',
  // 新增菜单
  ADD_MENU_URL = '/admin/acl/permission/save',
  // 更新菜单
  UPDATE_MENU_URL = '/admin/acl/permission/update',
  // 删除菜单
  REMOVE_MENU_URL = '/admin/acl/permission/remove/',
}

// 获取全部菜单
export const reqAllMenus = () =>
  request.get<any, MenuPermissionResponseData>(API.ALL_MENU_URL)

// 添加/更新菜单
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  // 更新
  if (data.id) {
    return request.put<any, any>(API.UPDATE_MENU_URL, data)
  }
  // 添加
  else {
    return request.post<any, any>(API.ADD_MENU_URL, data)
  }
}

// 删除菜单
export const reqRemoveMenu = (menuId: number) =>
  request.delete<any, any>(API.REMOVE_MENU_URL + menuId)
