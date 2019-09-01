import React, { Component } from 'react'
import{
  Table,
  Button,
  Card,
  Modal,
  message
} from 'antd'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { getRoles, addRole, updateRole } from '../../api/index'
import {PAGE_SIZE} from '../../utils/constance'
import formatDate from '../../utils/dateUtils.js'
class Role extends Component {
  state = {
    roles: [], // 所有角色列表
    role: {}, // 选中的role
    visible: false, // modal 对话框是否可见（添加角色）
    authVisible: false // modal 对话框是否可见（角色授权）
  }

  constructor (props) {
    super(props)
    this.auth = React.createRef()
  }
  
  initColumns = () => {
    this.columns = [
      {
        dataIndex: 'name',
        title: '角色名称'
      },
      {
        dataIndex: 'create_time',
        title: '创建时间',
        render: formatDate
      },
      {
        dataIndex: 'auth_time',
        title: '授权时间',
        render: formatDate
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

  /*
    角色授权
  */
  handleAuthRole = async () => {
    // 收集子组件checkedKeys状态
    const menus = this.auth.current.getMenus()
    const {role} = this.state
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = this.props.user.username
    const ret = await updateRole(role)
    if (ret.status === 0) {
      // 判断当前用户是否给自己的角色授权，是则强制重新登录
      if (role._id === this.props.user.role_id) {
        // 强制退出
        this.props.logout()
        message.success('您的角色被重新授权，请重新登录！')
      } else {
        message.success('授权成功！')
        this.setState({
          roles: [...this.state.roles],
          authVisible: false
        })
      }
    } else {
      message.error('授权失败！')
    }
  }

  /*
    添加角色
  */
  handleAddRole = () => {
    // 对表单进行统一规则验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 验证通过
        const {roleName} = values
        const ret = await addRole(roleName)
        if (ret.status === 0) {
          message.success('添加角色成功！')
          this.getRoles()
          this.form.resetFields()
          this.setState({visible: false})
        } else {
          message.error('添加角色失败！')
        }
      } else {
        console.log(error)
      }
    })
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getRoles()
  }
  render() {
    console.log('role.jsx---render()')
    const {roles, role, visible, authVisible} = this.state
    const title = (<span><Button type='primary' style={{marginRight: 15}} onClick={() => this.setState({visible: true})}>创建角色</Button><Button type='primary' disabled={!role._id} onClick={() => this.setState({authVisible: true})}>设置角色权限</Button></span>)
    return (
      <Card title={title}>
        <Table
          dataSource={roles}
          columns={this.columns}
          rowKey='_id'
          bordered
          pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
          rowSelection={{type: 'radio', selectedRowKeys: [role._id],
            // 点击radio的回调，解决单独点击radio选不中的Bug
            onSelect: role => this.setState({role})}
          }
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={visible}
          onOk={this.handleAddRole}
          onCancel={() => {
            this.setState({visible: false})
            this.form.resetFields()
          }}
          okText="确认"
          cancelText="取消"
        >
          <AddForm getForm={(from) => this.form = from}></AddForm>
        </Modal>
        <Modal
          title='设置角色权限'
          visible={authVisible}
          onOk={this.handleAuthRole}
          onCancel={() => this.setState({authVisible: false})}
          okText='确认'
          cancelText='取消'
        >
          <AuthForm role={role} ref={this.auth}/>
        </Modal>
      </Card>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {logout}
)(Role)