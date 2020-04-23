module.exports = {
  // TODO 配置跨域
  devServer: {
    proxy: {
      // # 只对请求路由以/api开头的请求进行代理转发
      '^/api': {
        // # 转发的目标url
        target: 'http://47.93.148.192/',
        // # 支持跨域
        changeOrigin: true
      }
    }
  }
}
