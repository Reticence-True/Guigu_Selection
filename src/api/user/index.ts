// 用户api
import request from '@/utils/request'
import type { loginForm, loginResponseData, useResponseData } from './type'

// 接口统一管理
enum API {
  LOGIN_URL = 'user/login',
  USERINFO_URL = 'user/info',
}
// 暴露请求函数
// 登录接口
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, useResponseData>(API.USERINFO_URL)
