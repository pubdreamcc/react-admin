import React, { Component } from 'react'
import {
  Button,
  Card,
  Table,
  Modal,
  message
} from 'antd'
import UserForm from './user-form'
import {getUsers, addOrUpdateUser, deleteUser} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constance.js'
import LinkButton from '../../components/link-button/LinkButton'
import dateFormat from '../../utils/dateUtils.js'
export default class User extends Component {
  
  state = {
    users: [], // 所有用户的信息列表
    roles: [], // 所有角色列表数组
    isShow: false // 添加或修改用户modal是否可见
  }

  initColumns = () => {
    this.columns = [
      {title: '用户名', dataIndex: 'username'},
      {title: '邮箱', dataIndex: 'email'},
      {title: '电话', dataIndex: 'phone'},
      {title: '注册时间', dataIndex: 'create_time', render: dateFormat},
      {title: '所属角色', dataIndex: 'role_id', render: (role_id) => this.roleNames[role_id]},
      {title: '操作', render: user => {
        return (<span><LinkButton onClick={this.showUpdate.bind(this, user)}>修改</LinkButton><LinkButton onClick={this.deleteUser.bind(this, user)}>删除</LinkButton></span>)
      }}
    ]
  }

  /*
    根据角色列表数组生成角色名的对象（属性名为角色ID）
  */
  initRoleNames = (roles) => {
    this.roleNames = roles ? roles.reduce((prev, curr) => {
      prev[curr._id] = curr.name
      return prev
    }, {}) : {}
    console.log(this.roleNames)
  }

  getUsers = async () => {
    const ret = await getUsers()
    if (ret.status === 0) {
      const {users, roles}= ret.data
      // 调用 initRoleNames() 生成所有角色名的对象
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  /*
    显示添加用户modal对话框
  */
  showAdd = () => {
    this.user = null
    this.setState({
      isShow: true
    })
  }

  /*
    显示更新用户modal对话框
  */
  showUpdate = (user) => {
    this.user = user
    this.setState({
      isShow: true
    })
  }

  /*
    添加或修改用户
  */
  addOrUpdateUser = () => {
    // 对表单进行统一验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 验证成功，发送请求修改或添加用户
        // 清除form表单数据，保证modal每次打开都是新的内容
        this.form.resetFields()
        this.setState({isShow: false})
        const {username, email, phone, password, role_id} = values
        let user
        if (this.user && this.user._id) {
          // 说明是更新用户
          user = {username, email, phone, role_id, _id: this.user._id}
        } else {
          // 说明是添加用户
          user = {username, email, phone, password, role_id}
        }
        const ret = await addOrUpdateUser(user)
        if (ret.status === 0) {
          message.success(`${ this.user ? '修改' : '添加' }成功！`)
          this.getUsers()
        }
      } else {
        console.log(error)
      }
    })
  }

  /*
    删除用户
  */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确定要删除${user.username}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async() => {
        const ret = await deleteUser(user._id)
        if (ret.status === 0) {
          message.success('删除成功！')
          this.getUsers()
        } else {
          message.error('删除用户失败！')
        }
      }
    })
  }

  componentWillMount () {
    // 为第一次render() 准备数据
    this.initColumns()
  }

  componentDidMount () {
    // 获取所有用户列表
    this.getUsers()
  }

  render() {
    const title = (<Button type='primary' onClick={this.showAdd}>创建用户</Button>)
    const {users, isShow, roles} = this.state
    const user = this.user || {}
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={ users }
          columns={ this.columns }
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
        />
        <Modal 
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          okText='确定'
          cancelText='取消'
          onCancel={() => {
            this.setState({isShow: false})
            this.form.resetFields()
          }}
          onOk={this.addOrUpdateUser}
        >
          <UserForm roles={roles} setForm={form => this.form = form} user={user}/>
        </Modal>
      </Card>
    )
  }
}
