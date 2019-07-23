import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message} from 'antd'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import './login.less'
import { loginIf } from '../../api/index'
class Login extends Component {
  handleSubmit = (e) => {
    //表单有默认提交行为，阻止事件默认行为
    e.preventDefault()
    // 统一对表单数据进行一次验证
    this.props.form.validateFields(async (error, values) => {
      if (error) {
        console.log(error)
      } else {
        // 前台表单验证通过， 发送Ajax请求登录用户
        const {userName, password} = values
        // 使用 result 接收异步请求成功得到的结果，请求失败内部自己已经处理
        const result = await loginIf({username: userName, password: password})
        if (result.status === 0) {
          // 保存user数据到内存
          memoryUtils.user = result.data
          // 保存user数据到localStorage
          storageUtils.savaUser(result.data)
          // 登录成功，跳转路由 '/'
          this.props.history.replace('/')
        } else {
          // 登录失败，提示失败信息
          message.error(result.msg)
        }
      }
    })
  }
  render() {
    if (memoryUtils.user._id && memoryUtils.user.username) {
      // 用户已经登录，跳转到管理页（/）
      return <Redirect to='/'/>
    }
    const {getFieldDecorator} = this.props.form
    return (
      <div className='login'>
        <header className='login-header'>
          <img src="/images/logo.png" alt=''/>
          <h1>后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('userName', {
                  rules: [{max: 12, message: '用户名至多12位'}, {min: 4, message: '用户名至少4位'}, {required: true, message: '用户名必须填写'}, {whitespace: true, message: '用户名不能包含空格'}],
                  initialValue: 'admin'
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }                
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{max: 20, message: '密码至多20位'}, {min: 4, message: '密码至少4位'}, {required: true, message: '密码必须填写'}, {whitespace: true, message: '密码不能包含空格'}, {pattern: /^[A-Za-z_0-9]+$/, message: '密码必须由字母下划线或数字组成'}]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
const WrapLogin = Form.create()(Login)

export default WrapLogin
