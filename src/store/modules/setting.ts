// layout组件相关的配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayoutSettingStore = defineStore('SettingStore', () => {
  // 数据
  const isCollapse = ref(false) // 控制菜单折叠
  const refresh = ref(false) // 刷新
  // 行为

  // 计算属性

  return {
    isCollapse,
    refresh,
  }
})
export default useLayoutSettingStore
