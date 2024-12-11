/* 菜单管理接口数据类型 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 菜单信息
export interface Menu {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: string
  toCode?: string
  type?: number
  status?: null
  level: number
  children?: Menu[]
  select?: boolean
}

// 角色权限返回数据
export interface MenuPermissionResponseData extends ResponseData {
  data: Menu[]
}

// 修改/添加数据类型
export interface MenuParams {
  id?: number
  pid: number
  name: string //菜单名字
  code: string // 权限数值
  level: number // 菜单级别
}
