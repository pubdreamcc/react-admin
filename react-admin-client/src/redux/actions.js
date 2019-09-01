// 包含多个 action creator 函数模块
import {SET_HEAD_TITLE, RECEIVE_USER, ERROR_MSG, RESET_USER} from './action-types'
import {loginIf} from '../api/index'
import storageUtils from '../utils/storageUtils'
// 同步action
export const setHeadTitle = (HeadTitle) => ({type: SET_HEAD_TITLE, data: HeadTitle})

// 接收用户信息的同步action

export const receiveUser = (user) => ({type: RECEIVE_USER, user})

// 保存错误信息的同步 action

export const errorMsg = (errorMsg) => ({type: ERROR_MSG, errorMsg})

// 封装一个重置 user 状态的同步action
export const logout = () => {
  // 清除local storage 中的数据
  storageUtils.removeUser()
  // 返回重置user数据状态的action
  return ({type: RESET_USER})
}

// 封装一个异步登录 action

export const login = (username, password) => {
  return async dispatch => {
    // 1. 做一些异步登录处理
    const ret = await loginIf({username, password})
    if (ret.status === 0) {
      // 保存用户信息到 storage
      const user = ret.data
      storageUtils.savaUser(user)
      // 登录成功，分发一个接收用户信息的action
      dispatch(receiveUser(user))
    } else {
      // 登录失败，分发一个保存错误信息的action
      const errormsg = ret.msg
      dispatch(errorMsg(errormsg))
    }
  }
}