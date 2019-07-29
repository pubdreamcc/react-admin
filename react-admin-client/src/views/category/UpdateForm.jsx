import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
class UpdateForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categoryName: PropTypes.string.isRequired
  }
  componentWillMount () {
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { categoryName } = this.props
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator(
              'categoryName', {
                rules: [{required: true, message: '分类名称必须输入！'}],
                initialValue: categoryName
              }
            )(
              <Input placeholder='请输入分类名称'></Input>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)