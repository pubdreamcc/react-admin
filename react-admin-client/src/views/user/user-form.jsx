import React, { Component } from 'react'
import propTypes from 'prop-types'
import {
  Form,
  Input,
  Select
} from 'antd'
const Option = Select.Option
const Item = Form.Item
class UserForm extends Component {

  static propTypes = {
    roles: propTypes.array.isRequired,
    setForm: propTypes.func.isRequired,
    user: propTypes.object.isRequired
  }

  componentWillMount() {
    // 把自己的form属性传递给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    console.log('userForm--render()')
    console.log(this.props.user)
    const {getFieldDecorator} = this.props.form
    const {roles, user} = this.props
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 20 } // 右侧包裹的宽度
    }
    return (
      <Form {...formItemLayout}>
        <Item label='用户名'>
          {
            getFieldDecorator('username', {
              rules: [{message: '用户名必须输入!', required: true}],
              initialValue: user.username
            })(
              <Input placeholder='请输入用户名' />
            )
          }
        </Item>
        {
          user.password ? null : (
            <Item label='密码'>
              {
                getFieldDecorator('password', {
                  rules: [{message: '密码必须输入!', required: true}]
                })(
                  <Input placeholder='请输入密码' />
                )
              }
            </Item>
          )
        }
        <Item label='手机号'>
          {
            getFieldDecorator('phone', {
              rules: [{message: '手机号必须输入!', required: true}],
              initialValue: user.phone
            })(
              <Input placeholder='请输入手机号' />
            )
          }
        </Item>
        <Item label='邮箱'>
          {
            getFieldDecorator('email', {
              rules: [{message: '邮箱必须输入!', required: true}],
              initialValue: user.email
            })(
              <Input placeholder='请输入邮箱' />
            )
          }
        </Item>
        <Item label='角色'>
          {
            getFieldDecorator('role_id', {
              rules: [{required: true, message: '角色必须输入！'}],
              initialValue: user.role_id
            })(
              <Select>
                {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)