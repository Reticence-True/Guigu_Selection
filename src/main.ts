import { createApp } from 'vue'
import App from '@/App.vue'

// 引入 element-plus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus中文
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg插件
import 'virtual:svg-icons-register'
// 全局组件注册插件
import GlobalComponents from "@/components/index.ts"
// 全局样式
import "@/styles/index.scss"
// 引入路由
import router from './router'

// 获取app实例
const app = createApp(App)
// 使用中文element-plu8
app.use(ElementPlus, {
  locale: zhCn,
})
// 使用全局组件注册
app.use(GlobalComponents)
// 注册路由
app.use(router)

// console.log(import.meta.env); // 获取环境变量

app.mount('#app')
