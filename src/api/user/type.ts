// 登录接口参数
export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token: string
}

// 登录返回数据
export interface loginResponseData {
  code: number
  data: dataType
}

// 服务器返回用户信息的相关数据类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}
export interface useResponseData {
  code: number
  data: user
}
