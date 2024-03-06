import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入nodejs内置的path模块：用于获取某个文件或者文件夹的路径（包括相对路径/绝对路径）
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  }
})