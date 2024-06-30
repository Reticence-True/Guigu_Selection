import { ref } from 'vue'
import { defineStore } from 'pinia'
// 接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 本地存储操作
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
// 常量路由
import { constantRoute } from '@/router/routes'
// 数据类型
import { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type'

// 创建用户小仓库
export const useUserStore = defineStore('User', () => {
  /* 数据 */
  // token
  let token = ref(GET_TOKEN('TOKEN'))
  let username = ref()
  let avatar = ref()
  // 常量路由
  const menuRoutes = constantRoute

  /* 行为 */
  // 登录功能
  async function userLogin(loginForm: loginFormData) {
    let result: loginResponseData = await reqLogin(loginForm)
    // 成功：存储token
    if (result.code === 200) {
      // 存储token
      this.token = result.data
      // 持久化存储
      SET_TOKEN(token.value as string)
      return 'ok' // 保证async返回fulfiled
    } else if (result.code === 201) {
      // 失败：返回错误信息
      return Promise.reject(new Error(result.data.message))
    }
  }

  // 获取用户信息
  async function userInfo() {
    // 获取信息
    let res : userInfoResponseData = await reqUserInfo();
    // 存储信息
    if (res.code === 200) {
      // 获取用户信息
      this.username = res.data.name
      this.avatar = res.data.avatar
      return 'ok'
    } else {
      // 失败
      return Promise.reject('获取信息失败')
    }
  }

  // 退出登录
  async function userLogout() {
    //  发请求
    let res : any = await reqLogout()
    if (res.code === 200) {
      this.username = ""
      this.token = ""
      this.avatar = ""
      REMOVE_TOKEN()
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  }

  /* 计算属性 */

  return {
    // 数据
    menuRoutes,
    token,
    username,
    avatar,
    // 行为
    userLogin,
    userInfo,
    userLogout,
  }
})
