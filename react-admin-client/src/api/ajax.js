// 封装 axios 模块

import axios from 'axios'

function ajax (url, data={}, method='GET') {
  if (method === 'GET') {
    // 发送get 请求
    return axios.get(url, {params: data})
  } else {
    // 发送post 请求
    return axios.post(url, data)
  }
}

// 向外暴露 ajax

export default ajax