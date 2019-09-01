// redux 核心 状态管理 store 模块
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'
import thunk from 'redux-thunk'
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))