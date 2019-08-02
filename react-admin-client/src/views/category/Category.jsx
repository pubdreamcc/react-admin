import React, { Component } from 'react'
import {Card, Table, Button, Icon, message, Modal} from 'antd'
import {categoryIf, addCategoryIf, updateCategoryIf} from '../../api/index'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
export default class Category extends Component {
  state = {
    category: [], // 一级分类列表数据
    subCategory: [], // 二级分类列表数据
    parentId: '0',
    parentName: '', // 当前二级分类的父类类名，默认一级分类没有父级分类
    loading: false, // 当前是否正在请求数据中
    visible: 0 // 对话框的显示与隐藏，0 ：隐藏；1： 显示添加分类； 2： 显示修改分类
  }
  /*
    显示添加分类对话框
  */
  showAdd = () => {
    this.setState({visible: 1})
  }
  /*
    显示修改分类对话框
  */
  showUpdate = (category) => {
    this.setState({visible: 2})
    // 将当前分类名字保存到组件实例对象中
    this.categoryName = category.name
    this.categoryId = category._id
  }
  /*
    添加分类
  */
  addCategory = () => {
    // 判断用户输入的是否符合表单验证规则
    this.form.validateFields(async (errors, values) => {
      if (!errors) {
        // 验证通过，关闭对话框
        this.form.resetFields()
        this.setState({visible: 0})
        const {parentId, categoryName} = values
        // 发送Ajax添加分类
        const ret = await addCategoryIf(parentId, categoryName)
        if (ret.status === 0) {
          // 添加分类成功
          if (parentId === '0') {
            // 说明添加的是一级分类列表，需要重新获取一级分类列表
            this.getCategory('0')
          } else if (parentId === this.state.parentId) {
            // 说明在当前二级分类列表下添加新的二级分类，需要重新获取当前二级分类列表
            this.getCategory()
          }

        }
      } else {
        console.log(errors)
      }
    })
  }
  /*
    修改分类
  */
  updateCategory = () => {
    // 先判断表单数据是否验证成功
    this.form.validateFields(async (errors, values) => {
      if (!errors) {
        // 验证成功，隐藏对话框
        this.setState({visible: 0})
        this.form.resetFields()
        const {categoryName} = values
        const ret = await updateCategoryIf(this.categoryId, categoryName)
        if (ret.status === 0) {
          // 修改成功，重新获取分类列表信息
          this.getCategory()
        }
      } else {
        console.log(errors)
      }
    })
  }
  /*
    隐藏对话框
  */
  handleCancel = () => {
    // 清空 form 表单的数据
    this.form.resetFields()
    // 设置对话框为隐藏状态
    this.setState({visible: 0})
  }
  /*
    获取一级/二级分类
  */
  getCategory = async (parentId) => {
    // 如果没有传 parentId，则等于 state 中的 parentId 值
    parentId = parentId || this.state.parentId
    // 请求数据之前显示loading
    this.setState({loading: true})
    const ret = await categoryIf(parentId)
    // 请求数据完成之后，隐藏loading
    this.setState({loading: false})
    if (ret.status === 0) {
      if (parentId === '0') {
        // 获取到的是一级分类列表数据
        const category = ret.data
        this.setState({category})
      } else {
        // 获取到的是二级分类列表数据
        const subCategory = ret.data
        this.setState({subCategory})
      }
    } else {
      // 获取分类列表数据失败（此时，请求还是成功的）
      message.error('获取列表数据失败')
    }
  }

  /*
    初始化 table 的列的数组
    
    */
  initColumn = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        render: (category) => {
        return (
          <span>
            <Button size='small' style={{marginRight: 10}} type='primary' onClick={this.showUpdate.bind(this, category)}>修改分类</Button>
            {this.state.parentId === '0' ? <Button size='small' type='primary' onClick={this.showSubCategory.bind(this, category)}>查看子分类</Button> : null}
          </span>
          )
        },
        width: 300
      }
    ]
  }
  /*
    显示一级分类列表
    
  */
  showCategory = () => {
    // 改变 state 中的 parentId 为 '0'
    this.setState({parentId: '0'})
  }
  /*
    显示二级分类
  */
  showSubCategory = (category) => {
    // 修改 state 中的 parentId, parentName
    const parentId = category._id
    const parentName = category.name
    this.setState({parentId, parentName}, () => {
      // react 更新数据是异步完成的，所以只能在回调中调用 getCategory() 获取二级分类
      this.getCategory()
    })
  }
  componentWillMount () {
    // 获取一级分类列表，不传参数，默认 parentId 为 '0'
    this.getCategory()
    // 初始化 table 的列的数组
    this.initColumn()
  }

  render() {
    const {category, loading, parentId, parentName, subCategory, visible} = this.state
    const title = parentId === '0' ? '一级分类列表' : (<span><Button type='primary' size='small' style={{marginRight: '10px'}} onClick={this.showCategory}>一级分类列表</Button><Icon type='arrow-right' style={{marginRight: '10px'}}/><span>{parentName}</span></span>)
    const extra = (<Button type='primary' onClick={this.showAdd}><Icon type='plus'></Icon>添加</Button>)
    return (
      <Card title={title} extra={extra}>
        <Table 
        dataSource={parentId === '0' ? category : subCategory } 
        columns={this.columns} 
        rowKey='_id'
        bordered
        pagination={{defaultPageSize: 5, showQuickJumper: true}}
        loading={loading}
        />
        <Modal
          title="添加分类"
          visible={visible === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <AddForm
            parentId={parentId}
            category={category}
            setForm={(form) => {this.form = form}}
          ></AddForm>
        </Modal>
        <Modal
          title="修改分类"
          visible={visible === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <UpdateForm setForm={(form) => {this.form = form}} categoryName={this.categoryName === undefined ? undefined : this.categoryName}></UpdateForm>
        </Modal>
      </Card>
    )
  }
}
