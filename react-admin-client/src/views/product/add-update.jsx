import React, { Component } from 'react'
import {
  Card, 
  Icon, 
  Button,
  Form,
  Input,
  Cascader,
  message
} from 'antd'
import PictureWall from './picture-wall'
import RichTextEditor from './RichTextEditor'
import { categoryIf, updateProductInfoIf, addProduct } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils.js'
const { Item } = Form
const { TextArea } = Input
class ProductAddUpdate extends Component {
  constructor (props) {
    super(props)
    // 创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef()
    this.editor = React.createRef()
  }
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
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        // 表单验证成功，发送请求更新/添加商品
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length > 1) {
          // 该商品是二级分类下的商品
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        } else {
          // 该商品是一级分类下的商品
          pCategoryId = '0'
          categoryId = categoryIds[0]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()
        if (this.isUpdate) {
          // 更新商品信息
          const _id = this.product._id
          const productInfo = {_id, categoryId, pCategoryId, name, desc, price, imgs, detail}
          const ret = await updateProductInfoIf(productInfo)
          if (ret.status === 0) {
            message.success('更新商品成功！')
            this.props.history.replace('/product')
          } else {
            message.error('更新商品失败！')
          }
        } else {
          // 添加商品
          const product = {categoryId, pCategoryId, name, desc, price, imgs, detail}
          const ret = await addProduct(product)
          if (ret.status === 0) {
            message.success('添加商品成功！')
            this.props.history.replace('/product')
          } else {
            message.error('添加商品失败！')
          }
        }
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
  initOptions = async (categories) => {
    const options = categories.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false // 默认当前一级分类不是叶子
    }))
    const {product, isUpdate} = this
    const {pCategoryId} = product
    if (pCategoryId !== '0' && isUpdate) {
      // 当前商品属于二级分类下的商品，为该商品准备对应一级分类下的二级分类数据数组
      const subCategories = await this.getCategories(pCategoryId)
      const childOptions = subCategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true // 二级分类都是叶子
      }))
      // 关联到当前一级分类 options 上面
      const targetOption = options.find(o => o.value === pCategoryId)
      targetOption.children = childOptions
    }
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
  componentWillMount () {
    // 取出memoryUtils 中的 product
    const product = memoryUtils.product
    this.product = product
    // 利用JSON.stringify() 将对象转换成JSON字符串进行比较
    this.isUpdate = (JSON.stringify(product) === '{}' ? false : true)
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
    const {product, isUpdate} = this
    console.log(product)
    const {pCategoryId, categoryId, imgs, detail} = product
    const categoryIds = []
    if (isUpdate) {
      // 如果商品是一级分类商品
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {
        // 商品是二级分类下的商品
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
      
    }
    const title = (<span><Button type='primary' onClick={() => this.props.history.goBack()} style={{marginRight: 10}}><Icon type='arrow-left'/></Button>{isUpdate ? '修改商品' : '添加商品'}</span>)
    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label='商品名称'>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '商品名称必须输入'}],
              initialValue: product.name
            })(<Input placeholder='请输入商品名称'></Input>)}
          </Item>
          <Item label='商品描述'>
            {getFieldDecorator('desc', {
              rules: [{required: true, message: '商品描述必须输入'}],
              initialValue: product.desc
            })(<TextArea placeholder='请输入商品描述' autosize={{ minRows: 2, maxRows: 6 }}></TextArea>)}
          </Item>
          <Item label='商品价格'>
            {getFieldDecorator('price', {
              rules: [{required: true, message: '商品价格必须有'}, {validator: this.validatePrice}],
              initialValue: product.price
            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)}
          </Item>
          <Item label='商品分类'>
            {getFieldDecorator('categoryIds', {
              rules: [{required: true, message: '商品必须有分类'}],
              initialValue: categoryIds
            })(
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                placeholder='请选择商品分类'
              />
            )}
          </Item>
          <Item label='商品图片'>
            <PictureWall imgs={imgs} ref={this.pw}></PictureWall>
          </Item>
          <Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.editor} detail={detail}/>
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