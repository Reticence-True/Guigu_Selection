// 路由鉴权
import router from '@/router'
// 进度条插件
// @ts-ignore
import nprogress from 'nprogress'
// 进度条杨树
import 'nprogress/nprogress.css'
// 取消加载动画
nprogress.configure({ showSpinner: false })
// 仓库
import { pinia } from './store'
import { useUserStore } from './store/modules/user'
import setting from './setting'

// 在组件外部，使用小仓库会报错，需要引入Pinia并传入 | 或者是在路由守卫里定义也不会报错
const userStore = useUserStore(pinia)

// 全局守卫：项目任意路由切换都会触发的钩子
// 全局前置守卫
/**
 * @param {any} to 即将要访问的那个路由
 * @param {any} from 从哪个路由而来
 * @param {any} next 路由放行函数
 */
router.beforeEach(async (to, from, next) => {
  // 进度条业务
  nprogress.start()
  // 修改页面
  document.title = setting.title + ' - ' + to.meta.title

  // 获取token，判断用户登录状态
  if (userStore.token) {
    // 登录判断
    if (to.path === '/login') {
      // 登录成功想访问login
      next({ path: '/' })
    } else {
      // 其余放行
      // 保证每个路由都由用户信息
      if (userStore.username) {
        // 有用户名(信息)
        // 放行
        next()
      } else {
        // 没有
        // 发请求获取用户信息后放行
        try {
          await userStore.userInfo() // 获取用户信息成功
          next() // 放行
        } catch (e) {
          // token 过期 | 用户手动修改本地存储 token
          console.error('ERROR: ', e)
          // 清空数据并回登录页
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录判断
    if (to.path === '/login') {
      next() // 放行
    } else {
      next({ path: '/login', query: { redirect: to.path } }) // 未登录想访问其他页面
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  // 进度条业务
  nprogress.done()
})
