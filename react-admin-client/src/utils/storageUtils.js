// 保存数据到 localstorage 的工具 模块
import store from 'store'
const USER_KEY = 'user_key'
const PRODUCT_KEY = 'product'
export default {
  // 保存
  savaUser (user) {
    store.set(USER_KEY, user)
  },

  // 删除
  removeUser () {
    store.remove(USER_KEY)
  },

  // 获取

  getUser () {
    return store.get(USER_KEY)
  },

  // 保存商品
  saveProduct (product) {
    store.set(PRODUCT_KEY, product)
  },

  // 获取商品
  getProduct () {
    return store.get(PRODUCT_KEY)
  }
}