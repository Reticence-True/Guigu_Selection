// element-plus 全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import SvgIcon from './SvgIcon/index.vue'

// 自定义插件
const GloComponents = { SvgIcon }

export default {
  install(app: any) {
    // elem icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // 自定义组件
    for (const [key, value] of Object.entries(GloComponents)) {
      app.component(key, value)
    }
  },
}
