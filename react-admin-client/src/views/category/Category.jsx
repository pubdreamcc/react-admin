import React, { Component } from 'react'
import {Card, Table, Button, Icon, message} from 'antd'
import {categoryIf} from '../../api/index'
export default class Category extends Component {
  state = {
    category: [], // 一级分类列表数据
    subCategory: [], // 二级分类列表数据
    parentId: '0',
    parentName: '', // 当前二级分类的父类类名，默认一级分类没有父级分类
    loading: false // 当前是否正在请求数据中
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
          <a href='javascript:;'>
            <Button size='small' style={{marginRight: 10}} type='primary'>修改分类</Button>
            {this.state.parentId === '0' ? <Button size='small' type='primary' onClick={this.showSubCategory.bind(this, category)}>查看子分类</Button> : null}
          </a>
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
    const {category, loading, parentId, parentName, subCategory} = this.state
    const title = parentId === '0' ? '一级分类列表' : (<span><Button type='primary' size='small' style={{marginRight: '10px'}} onClick={this.showCategory}>一级分类列表</Button><Icon type='arrow-right' style={{marginRight: '10px'}}/><span>{parentName}</span></span>)
    const extra = (<Button type='primary'><Icon type='plus'></Icon>添加</Button>)
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
      </Card>
    )
  }
}
