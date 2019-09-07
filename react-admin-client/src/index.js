// 入口文件
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 从 localStorage 中读取  product 数据，并保存到内存中，程序一上来就会执行
// const user = storageUtils.getUser() || {}
const product = storageUtils.getProduct() || {}
// memoryUtils.user = user
memoryUtils.product = product
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root')
)