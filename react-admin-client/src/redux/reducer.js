// 包含多个 reducer 函数模块。
import {SET_HEAD_TITLE, RECEIVE_USER, ERROR_MSG, RESET_USER} from './action-types'
import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'

// 设置头部标题的 reducer 函数 =》 管理 redux 中的 头部标题 状态
const initHeadTitle = ''
const setHeadTitle = (state=initHeadTitle, action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

// 管理用户数据状态的 reducer 函数
const initUser = storageUtils.getUser() ? storageUtils.getUser() : {}
const user = (state=initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case ERROR_MSG:
      return {...state, errorMsg: action.errorMsg}
    case RESET_USER:
      return {}
    default:
      return state
  }
}

// 将多个 reducer 函数包装成一个 最终的 reducer 函数，最终 redux 中的 store 状态数据结构 为：{setHeadTitle： xxx, user: {}}
export default combineReducers({
  setHeadTitle,
  user
})