import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import { Form, Icon, Input, Button} from 'antd'
// import storageUtils from '../../utils/storageUtils'
// import memoryUtils from '../../utils/memoryUtils'
import './login.less'
// import { loginIf } from '../../api/index'
class Login extends Component {
  handleSubmit = (e) => {
    //表单有默认提交行为，阻止事件默认行为
    e.preventDefault()
    // 统一对表单数据进行一次验证
    this.props.form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        // 前台表单验证通过， 发送Ajax请求登录用户
          const {userName, password} = values
          this.props.login(userName, password)
          // 登录成功，跳转路由 '/home'
          this.props.history.replace('/home')
        }
      }
    )
  }
  render() {
    if (this.props.user._id && this.props.user.username) {
      // 用户已经登录，跳转到管理页（/home）
      return <Redirect to='/home'/>
    }
    const errorMsg = this.props.user.errorMsg
    const {getFieldDecorator} = this.props.form
    return (
      <div className='login'>
        <header className='login-header'>
          <img src="/images/logo.png" alt=''/>
          <h1>后台管理系统</h1>
        </header>
        <section className='login-content'>
          <div className={errorMsg ? 'error-msg show' : 'error-msg'}>{errorMsg}</div>
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

export default connect(
  state => ({user: state.user}),
  {login}
)(WrapLogin)
