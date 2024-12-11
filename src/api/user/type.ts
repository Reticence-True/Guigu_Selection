// 登录信息
export interface loginFormData {
  username: string
  password: string
}
// 接口返回数据的通用类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 登录返回信息
export interface loginResponseData extends ResponseData {
  data: any
}
// 获取用户信息
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
