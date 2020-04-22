// - 引入axios
import axios from 'axios'

// # 全局配置axios
const ajax = axios.create({
  baseURL: 'api',
  timeout: 7000
})

// TODO Start 设置拦截器
// # 请求拦截器
ajax.interceptors.request.use(config => {
  return config
})

// # 响应拦截器
ajax.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
})
// TODO End 设置拦截器

// # 暴露ajax
export default ajax