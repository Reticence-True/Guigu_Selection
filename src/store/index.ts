import { createPinia } from 'pinia'

const pinia = createPinia()
// 由于此版本pinia的组合式API不支持$reset重置
// 所以重写$reset方法清空仓库
// 自定义插件
pinia.use(({ store }) => {
  // 获取最开始的state
  const initState = JSON.parse(JSON.stringify(store.$state))

  // 重写$reset方法
  store.$reset = () => {
    // 使用$patch批量修改state
    store.$patch(initState)
  }
})

export { pinia }
