import React, { Component } from 'react'
import { Form, Icon, Input, Button, } from 'antd'
import './login.less'
export default class Login extends Component {
  handleSubmit = (e) => {
    //表单有默认提交行为，阻止事件默认行为
    e.preventDefault()
  }
  render() {
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
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
            </Form.Item>
            <Form.Item>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
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
