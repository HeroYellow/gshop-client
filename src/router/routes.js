// * 引入路由组件
import Home from '../pages/Home' // ? Home组件
import Login from '../pages/Login' // ? Login组件
import Register from '../pages/Register'

export default [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]