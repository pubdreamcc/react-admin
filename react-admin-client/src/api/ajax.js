// 封装 axios 模块
/* 
  优化：
  1.全局统一处理请求出错，外部使用时无需考虑请求错误情况
  2. 请求成功时，外部获取到的直接是接口返回数据，无需调用res.data
*/
import {message} from 'antd'
import axios from 'axios'

function ajax (url, data={}, method='GET') {
  return new Promise((resolve, reject) => {
    // 执行异步任务
    // 定义一个变量用来接收 axios 返回的 promise对象
    let promise 
    if (method === 'GET') {
      // 发送get 请求
      promise = axios.get(url, {params: data})
    } else {
      // 发送post 请求
      promise =  axios.post(url, data)
    }
    promise.then(res => {
      // 请求成功，直接把接口数据（res.data）暴露出去，不要暴露 （res）
      resolve(res.data)
    }).catch(error => {
      // 请求失败， 这里不用 reject(error), 直接处理错误
      message.error(error.message)
    })
  })
}

// 向外暴露 ajax

export default ajax