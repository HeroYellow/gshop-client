import Vue from 'vue'
import App from './App.vue'

// * 引入router路由
import router from './router'
// * 引入store
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
