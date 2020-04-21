// - Home路由组件
import Home from '../pages/Home' 
// - Login路由组件
import Login from '../pages/Login' 
// - 注册路由组件
import Register from '../pages/Register'
// - 注册路由组件
import Search from '../pages/Search' 

export default [
  // - Home路由组件
  { path: '/', component: Home }, 
  // - Login登录路由组件
  { path: '/login', meta: { isHideFooter: true }, component: Login }, 
  // - Register注册路由组件
  { path: '/register', meta: { isHideFooter: true }, component: Register }, 
  // - Search注册路由组件
  { name: 'search', path: '/search/:keyword?', component: Search }, 
  // - 重定向到Home路由组件
  { path: '/', redirect: '/' }, 
]