/* 角色管理数据类型 */

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 角色信息
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

// 获取角色响应信息
export interface AllRolesResponseData extends ResponseData {
  data: {
    records: Role[]
    total: number
    size: number
    current: number
    pages: number
  }
}

// 角色权限
export interface MenuPermission {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children: MenuPermission[]
  select: boolean
}

// 角色权限返回数据
export interface PermissionResponseData extends ResponseData {
  data: MenuPermission[]
}
