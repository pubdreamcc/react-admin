// 角色授权组件
import React, { PureComponent } from 'react'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig.js'
import propTypes from 'prop-types'
const Item = Form.Item
const { TreeNode } = Tree

export default class AuthForm extends PureComponent {

  static propTypes = {
    role: propTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus // 初始授权状态
    }
  }
  /*
    根据 menuList 数据数组生成 TreeNode 标签数组，采用 map()
  */
  getTreeNodes = (menuList) => {
    return menuList.map(item => 
      <TreeNode title={item.title} key={item.key}>
        {item.children ? this.getTreeNodes(item.children) : null}
      </TreeNode>
    )
  }

  /*
    把自己已经选中的menus数组交给父组件
  */
  getMenus = () => this.state.checkedKeys

  /*
    点击 TreeNode 前多选框的回调
  */
  onCheck = (checkedKeys) => {
    this.setState({checkedKeys})
  }

  componentWillMount () {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  /*
    当组件接受到新的props时候调用，第一次渲染不会调用
  */
  componentWillReceiveProps (nextProps) {
    const checkedKeys = nextProps.role.menus
    this.setState({checkedKeys})
  }

  render() {
    console.log('auth-form---render()')
    const {checkedKeys} = this.state
    const role = this.props.role
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 20 } // 右侧包裹的宽度
    }
    return (
      <Form {...formItemLayout}>
        <Item label='添加角色'>
          <Input disabled value={role.name}></Input>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title='平台权限' key='all'>
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}
