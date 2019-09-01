// 包含多个 action creator 函数模块
import {SET_HEAD_TITLE} from './action-types'

// 同步action
export const setHeadTitle = (HeadTitle) => ({type: SET_HEAD_TITLE, data: HeadTitle})