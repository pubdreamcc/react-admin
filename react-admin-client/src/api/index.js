// 封装接口

import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export function loginIf ({username, password}) { return ajax('/login', {username, password}, 'POST' )}

// 获取一级/二级分类列表

export const categoryIf = (parentId) => ajax('/manage/category/list', {parentId})

// 更新分类信息

export const updateCategoryIf = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

// 添加分类

export const addCategoryIf = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST')

// 获取分类名称（单个）

export const getCategoryIf = (categoryId) => ajax('/manage/category/info', {categoryId})

// 获取商品分页列表

export const getProductListIf = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})

// 根据名称或描述搜索商品列表 （searchType：productName（名称）/productDesc（描述）） searchName：搜索关键字

export const searchProductIf = (pageNum, pageSize, searchType, searchName) => ajax('/manage/product/search', {pageNum, pageSize, [searchType]: searchName})

// 上/下架商品

export const updateStatusIf = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')

// 删除商品图片

export const deleteProductImgIf = (name) => ajax('/manage/img/delete', { name }, 'POST')

// 更新商品信息

export const updateProductInfoIf = (productInfo) => ajax('/manage/product/update', productInfo, 'POST')

// 添加商品

export const addProduct = (product) => ajax('/manage/product/add', product, 'POST')

// 获取角色列表

export const getRoles = () => ajax('/manage/role/list')

// 添加角色

export const addRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')

// 角色授权

export const updateRole = (role) => ajax('/manage/role/update', role, 'POST' )

// 获取用户信息

export const getUsers = () => ajax('/manage/user/list')

// 更新或添加用户

export const addOrUpdateUser = (user) => ajax('/manage/user'+(user.password ? '/add' : '/update'), user, 'POST')

// 删除用户

export const deleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST')

// 获取天气
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