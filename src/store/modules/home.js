import { reqBaseCategoryList } from '@/api'

const state = {
  // # TypeNav分类列表数据
  baseCategoryList: []
}
const mutations = {
  // TODO 获取TypeNav分类列表数据的mutation
  RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
    state.baseCategoryList = baseCategoryList.splice(0, baseCategoryList.length - 2)
  }
}
const actions = {
  // TODO 发送请求获取分类列表数据的action
  async getBaseCategoryList ({ commit }) {
    const result = await reqBaseCategoryList()
    if (result.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}