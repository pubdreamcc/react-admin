import React, { Component } from 'react'
import {Card, Table, Button, Icon, message} from 'antd'
import {categoryIf} from '../../api/index'
export default class Category extends Component {
  state = {
    category: [], // 一级分类列表数据
    loading: false // 当前是否正在请求数据中
  }

  /*
    获取一级分类
  */
  getCategory = async () => {
    // 请求数据之前显示loading
    this.setState({loading: true})
    const ret = await categoryIf('0')
    // 请求数据完成之后，隐藏loading
    this.setState({loading: false})
    if (ret.status === 0) {
      // 获取一级分类列表数据成功
      const category = ret.data
      this.setState({category})
    } else {
      // 获取一级分类列表数据失败（此时，请求还是成功的）
      message.error('获取列表数据失败')
    }
  }

  /*
    初始化 table 的列的数组
    
    */
  initColumn () {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        render: () => <a href='javascript:;'><Button size='small' style={{marginRight: 10}} type='primary'>修改分类</Button><Button size='small' type='primary'>查看子分类</Button></a>,
        width: 300
      }
    ]
  }

  componentWillMount () {
    // 获取一级分类列表
    this.getCategory()
    // 初始化 table 的列的数组
    this.initColumn()
  }

  render() {
    const title = '一级分类列表'
    const extra = (<Button type='primary'><Icon type='plus'></Icon>添加</Button>)
    const {category, loading} = this.state
    return (
      <Card title={title} extra={extra}>
        <Table 
        dataSource={category} 
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
