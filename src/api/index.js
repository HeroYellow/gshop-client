// - 引入ajax
import ajax from './ajax'

// TODO 发送请求
// # 获取三级分类数据
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
// # 发送登录请求
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', { mobile, password })