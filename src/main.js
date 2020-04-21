import Vue from 'vue'
import App from './App.vue'

// - 引入router路由
import router from './router'
// - 引入store
import store from './store'
// - 引入 TypeNav组件注册成全局组件
import TypeNav from './components/TypeNav'

Vue.config.productionTip = false

// TODO 注册全局组件
// - TypeNav组件
Vue.component('TypeNav', TypeNav)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
