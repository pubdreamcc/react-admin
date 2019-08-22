import React, { Component } from 'react'
import{
  Table,
  Button,
  Card
} from 'antd'
import { getRoles } from '../../api/index'
import {PAGE_SIZE} from '../../utils/constance'
export default class Role extends Component {
  state = {
    roles: [], // 所有角色列表
    role: {} // 选中的role
  }
  
  initColumns = () => {
    this.columns = [
      {
        dataIndex: 'name',
        title: '角色名称'
      },
      {
        dataIndex: 'create_time',
        title: '创建时间'
      },
      {
        dataIndex: 'auth_time',
        title: '授权时间'
      },
      {
        dataIndex: 'auth_name',
        title: '授权人'
      },
    ]
  }

  /*
    获取角色列表
  */

  getRoles = async () => {
    const ret = await getRoles()
    if (ret.status === 0) {
      const roles = ret.data
      this.setState({roles})
    }
  }

  /*
    表格行属性onRow
  */
  onRow = role => {
    return {
      onClick: event => {
        // 表格行点击时的回调
        this.setState({role})
      }
    }
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getRoles()
  }
  render() {
    const {roles, role} = this.state
    const title = (<span><Button type='primary' style={{marginRight: 15}}>创建角色</Button><Button type='primary' disabled={!role._id}>设置角色权限</Button></span>)
    return (
      <Card title={title}>
        <Table
          dataSource={roles}
          columns={this.columns} 
          rowKey='_id'
          bordered
          pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
          rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
          onRow={this.onRow}
        />
      </Card>
    )
  }
}
