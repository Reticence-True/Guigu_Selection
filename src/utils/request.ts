// 二次封装的axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const request = axios.create({
  // 配置基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 使用环境配置中的默认路径
  timeout: 5000, // 超时时间
})

// 添加拦截器
// 请求拦截器
request.interceptors.request.use((config) => {
  // config 存在 headers 属性，用以给请求配置公共参数
  // 返回配置对象，不然连请求都发不出去
  return config
})
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功的毁掉
    // 简化数据
    return response.data
  },
  (error) => {
    // 失败的回调，处理http网络错误
    // 存储网络错误信息
    let msg = ''
    let status = error.response.status

    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器错误'
        break
      default:
        msg = '网络问题'
    }

    ElMessage({
      type: 'error',
      message: msg,
    })

    return Promise.reject(error)
  },
)

export default request
