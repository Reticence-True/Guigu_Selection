import { ref } from 'vue'
import { defineStore } from 'pinia'
// 接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 本地存储操作
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
// 常量路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import router from '@/router'
// 数据类型
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'

/**
 * 过滤用户路由
 * @param asyncRoutes 异步路由列表
 * @param userPermission 用户权限路由名称
 * @returns 用户拥有的路由
 */
function filterUserRoutes(asyncRoutes: any, userPermission: any) {
  const async = [...asyncRoutes]
  // TODO
  return async.filter((route: any) => {
    if (userPermission.includes(route.name)) {
      if (route.children && route.children.length) {
        route.children = filterUserRoutes(route.children, userPermission)
      }
      return true
    }
  })
}

// 创建用户小仓库
export const useUserStore = defineStore('User', () => {
  /* 数据 */
  // token
  const token = ref(GET_TOKEN('TOKEN'))
  const username = ref()
  const avatar = ref()
  // 常量路由
  const menuRoutes = ref<any>([])
  // 按钮权限
  const buttons = ref<string[]>([])

  /* 行为 */
  // 登录功能
  async function userLogin(loginForm: loginFormData) {
    const result: loginResponseData = await reqLogin(loginForm)
    // 成功：存储token
    if (result.code === 200) {
      // 存储token
      token.value = result.data
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
    const res: userInfoResponseData = await reqUserInfo()
    // 存储信息
    if (res.code === 200) {
      // 获取用户信息
      username.value = res.data.name
      avatar.value = res.data.avatar
      // 用户异步路由
      const userAsyncRoutes = filterUserRoutes(asyncRoute, res.data.routes)
      // 设置路由权限
      menuRoutes.value = [...constantRoute, ...userAsyncRoutes, ...anyRoute]
      // 追加用户路由
      const excludesRoutes = [...userAsyncRoutes, ...anyRoute]
      excludesRoutes.forEach((route: any) => {
        router.addRoute(route)
      })
      // 按钮权限
      buttons.value = res.data.buttons

      return 'ok'
    } else {
      // 失败
      return Promise.reject('获取信息失败')
    }
  }

  // 退出登录
  async function userLogout() {
    //  发请求
    const res: any = await reqLogout()
    if (res.code === 200) {
      username.value = ''
      token.value = ''
      avatar.value = ''
      REMOVE_TOKEN()
      // 清空异步路由
      router.clearRoutes()
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
    buttons,
    // 行为
    userLogin,
    userInfo,
    userLogout,
  }
})
