/* 用户管理籍接口类型 */
// 账号信息
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 用户对象
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}
export interface UserResponseData extends ResponseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    pages: number
  }
}

// 职位数据
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}

// 职位接口返回数据
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: RoleData[]
    allRolesList: RoleData[]
  }
}

// 分配职位
export interface SetRoleData {
  userId: number
  roleIdList: number[]
}
