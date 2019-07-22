import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import './leftNav.less'
const { SubMenu } = Menu
class LeftNav extends Component {
  handleClick = ({ item, key, keyPath, domEvent }) => {
    switch (key) {
      case '1':
        this.props.history.push('/home')
        break
      case '5':
        this.props.history.push('/category')
        break
      case '6':
        this.props.history.push('/product')
        break
      case '2':
        this.props.history.push('/user')
        break
      case '3':
        this.props.history.push('/role')
        break
      case '7':
        this.props.history.push('/charts/bar')
        break
      case '8':
        this.props.history.push('/charts/line')
        break
      case '9':
        this.props.history.push('/charts/pie')
        break
      default:
        break
    }
  }
  render() {
    return (
      <div className='left-nav'>
        <Link to='/home' className='left-nav-header'>
          <img src="/images/logo.png" alt="" />
          <h1>硅谷管理</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          onClick={this.handleClick}
        >
          <Menu.Item key="1">
            <Icon type="home" />
            <span>首页</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Icon type="bars" />
              <span>品类管理</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="tool" />
              <span>商品管理</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='2'>
            <Icon type="user" />
            <span>用户登录</span>
          </Menu.Item>
          <Menu.Item key='3'>
            <Icon type="safety" />
            <span>角色管理</span>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="area-chart" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key='7'>
              <Icon type="bar-chart" />
              <span>柱形图</span>
            </Menu.Item>
            <Menu.Item key='8'>
              <Icon type="line-chart" />
              <span>折线图</span>
            </Menu.Item>
            <Menu.Item key='9'>
              <Icon type="pie-chart" />
              <span>饼图</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)