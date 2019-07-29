import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const Option = Select.Option
class AddForm extends Component {
  static propTypes = {
    category: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount () {
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { parentId, category } = this.props
    return (
      <Form>
        <Item>
          {
            getFieldDecorator(
              'parentId', {
                initialValue: parentId
              }
            )(
              <Select>
                <Option value='0'>一级分类</Option>
                {category.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)}
              </Select>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'categoryName', {
                rules: [{required: true, message: '分类名称必须输入！'}],
                initialValue: ''
              }
            )(
              <Input placeholder='请输入分类名称'></Input>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)