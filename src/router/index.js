// - 引入vue
import Vue from 'vue'
// - 引入vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// - 引入routes.js
import routes from './routes'

// TODO 全局配置路由的push和replace
// # 处理push方法路由跳转
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onComplete = () => {}, onAbort) {
  return VueRouterPush.call(this, location, onComplete, onAbort)
}
// # 处理replace方法路由跳转
const VueRouterReplace = Vue.prototype.replace
VueRouter.prototype.replace = function replace (location, onComplete, onAbort = () => {}) {
  return VueRouterReplace.call(this, location, onComplete, onAbort)
}

export default new VueRouter({
  mode: 'history',
  routes
})