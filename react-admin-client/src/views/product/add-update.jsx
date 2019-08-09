import React, { Component } from 'react'
import {
  Card, 
  Icon, 
  Button,
  Form,
  Input,
  Cascader
} from 'antd'
import PictureWall from './picture-wall'
import { categoryIf } from '../../api/index'
const { Item } = Form
const { TextArea } = Input
class ProductAddUpdate extends Component {
  state = {
    options: [] // 商品分类级联选择的数据数组
  }
  /*
    异步加载当前一级分类（一级联）下的二级分类（二级联）
  */
  loadData = async selectedOptions => {
    //  得到选择的option对象
    const targetOption = selectedOptions[selectedOptions.length - 1]
    // 显示loading
    targetOption.loading = true
    // 通过一级分类搜索二级分类
    const subCategories = await this.getCategories(targetOption.value)
    // 隐藏loading
    targetOption.loading = false
    if (subCategories && subCategories.length > 0) {
      // 说明当前一级分类有二级分类
      // 生成一个二级分类列表的options
      const childOptions = subCategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true // 二级分类都是叶子
      }))
      // 关联到当前option上
      targetOption.children = childOptions
    } else {
      // 当前一级分类没有二级分类
      targetOption.isLeaf = true // 修改当前一级分类为叶子，因为默认一级不为叶子
    }
    // 更新 state 中的 options
    this.setState({
      options: [...this.state.options]
    })
    
  }
  /*
    提交表单
  */
  submit = (e) => {
    e.preventDefault()
    // 对表单进行统一验证
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        // 表单验证成功
        console.log(values)
      } else{
        console.log(errors)
      }
    })
  }
  /*
    自定义商品价格输入字段验证规则
  */
  validatePrice = (rule, value, callback) => {
    if (+value <= 0) {
      callback('价格必须大于零')
    } else {
      callback()
    }
  }
  /*
    初始化state 中的 options
  */
  initOptions = (categories) => {
    const options = categories.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false // 默认当前一级分类不是叶子
    }))
    // 更新options
    this.setState({options})
  }
  /*
    获取商品分类（一级/二级）
  */
  getCategories = async (pCategoryId) => {
    const ret = await categoryIf(pCategoryId)
    if (ret.status === 0) {
      if (pCategoryId === '0') {
        // 获取的是一级分类
        const categories = ret.data
        this.initOptions(categories)
      } else {
        // 获取的是二级分类
        const subCategories = ret.data
        return subCategories
      }
    }
  }
  componentDidMount () {
    // 获取商品的一级分类
    this.getCategories('0')
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }
    const {getFieldDecorator} = this.props.form
    const isUpdate = false
    const title = (<span><Button type='primary' onClick={() => this.props.history.goBack()} style={{marginRight: 10}}><Icon type='arrow-left'/></Button>{isUpdate ? '修改商品' : '添加商品'}</span>)
    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label='商品名称'>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '商品名称必须输入'}],
              initialValue: ''
            })(<Input placeholder='请输入商品名称'></Input>)}
          </Item>
          <Item label='商品描述'>
            {getFieldDecorator('desc', {
              rules: [{required: true, message: '商品描述必须输入'}],
              initialValue: ''
            })(<TextArea placeholder='请输入商品描述' autosize={{ minRows: 2, maxRows: 6 }}></TextArea>)}
          </Item>
          <Item label='商品价格'>
            {getFieldDecorator('price', {
              rules: [{required: true, message: '商品价格必须有'}, {validator: this.validatePrice}],
              initialValue: ''
            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)}
          </Item>
          <Item label='商品分类'>
            {getFieldDecorator('categoryId', {
              rules: [{required: true, message: '商品必须有分类'}],
              initialValue: ''
            })(
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                placeholder='请选择商品分类'
              />
            )}
          </Item>
          <Item label='商品图片'>
            <PictureWall></PictureWall>
          </Item>
          <Item label='商品详情'>
            <div>商品详情</div>
          </Item>
          <Item>
            <Input type='submit' value='提交' style={{width: '20%', lineHeight: '0', backgroundColor: '#1DA57A', color: 'white'}}></Input>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)