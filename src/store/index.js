import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入 state、mutations、actions、getters
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})