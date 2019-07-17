// 封装接口

import ajax from './ajax'

// 登录
export function loginIf ({username, password}) { return ajax('/login', {username, password}, 'POST' )}