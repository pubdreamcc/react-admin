// 封装接口

import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export function loginIf ({username, password}) { return ajax('/login', {username, password}, 'POST' )}

// 天气
export const weatherIf = (city) => {
  return new Promise((resolve, reject) => {
    const url  = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (error, data) => {
      if(!error && data.status === 'success') {
        // 获取数据成功
        const {weather, dayPictureUrl} = data.results[0].weather_data[0]
        resolve({weather, dayPictureUrl})
      } else {
        // 获取数据失败
        message.error('获取天气信息失败！')
      }
    })
  })
}