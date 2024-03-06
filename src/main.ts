import { createApp } from 'vue'
import App from '@/App.vue'

// 引入 element-plus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus中文
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 获取app实例
const app = createApp(App)
// 使用中文element-plus
app.use(ElementPlus, {
    locale: zhCn,
})

// console.log(import.meta.env); // 获取环境变量

app.mount('#app')
