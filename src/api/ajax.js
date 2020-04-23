// - 引入axios
import axios from 'axios'
// - 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// # 全局配置axios
const ajax = axios.create({
  // # 配置请求路径
  baseURL: '/api',
  // # 配置请求的超时时间
  timeout: 7000
})

// TODO Start 设置拦截器
// # 请求拦截器
ajax.interceptors.request.use(config => {
  // # 发送数据请求显示进度条
  NProgress.start()
  return config
})

// # 响应拦截器
ajax.interceptors.response.use(
  response => {
    // # 数据请求完毕隐藏进度条
    NProgress.done()
    // # 返回请求成功的数据
    return response.data
  },
  error => {
    // # 数据请求完毕隐藏进度条
    NProgress.done()
    console.log(error)
    // # 返回失败的Promise
    return Promise.reject(error)
  }
)
// TODO End 设置拦截器

// # 暴露ajax
export default ajax
