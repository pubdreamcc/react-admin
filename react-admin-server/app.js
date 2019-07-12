// 引入express创建 http 服务
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./router/index')
const app = express()
// 开放静态资源
app.use(express.static('./public'))
// 配置解析post请求中间件 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 配置解析cookie数据的中间件
app.use(cookieParser())
// 挂载路由容器到app
app.use(router)
mongoose.connect('mongodb://localhost:27017/server_db2', {useNewUrlParser: true}).then(() => {
  console.log('数据库连接成功...')
  // 启动服务器
  app.listen('5000', () => {
    console.log('服务器启动成功...')
  })
}).catch(error =>{
  console.error('连接数据库失败', error)
})

