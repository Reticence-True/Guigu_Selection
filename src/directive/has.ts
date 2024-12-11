import { pinia } from '@/store'
import { useUserStore } from '@/store/modules/user'
import { App } from 'vue'

const userStore = useUserStore(pinia)

/* 自定义按钮指令 */
export const isHasButton = (app: App) => {
  // 全局自定义指令
  app.directive('has', {
    // 使用这个全局自定义指令的dom挂载完毕后会执行一次
    mounted(dom: any, options: any) {
      if (!userStore.buttons.includes(options.value)) {
        dom.remove()
      }
    },
  })
}
