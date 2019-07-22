import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import './leftNav.less'
const { SubMenu } = Menu
class LeftNav extends Component {
  handleClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return (
      menuList.map(item => {
        if (!item.children) {
          return (
          <Menu.Item key={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Menu.Item>
          )
        } else {
          if (item.children.find(cItem => {
            return cItem.key === path
          })) {
            this.openKey = item.key
          }
          return (
            <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          )
        }
      })
    )
  }
  componentWillMount () {
    this.menu = this.getMenuNodes(menuList)
  }
  render() {
    const path = this.props.location.pathname
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
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
        >
          {/* 利用menu配置文件来动态生成menu菜单项，更具有灵活性，便于后期不同角色分配不同的菜单权限 */}
          {this.menu}
          {/* <Menu.Item key="1">
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
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)