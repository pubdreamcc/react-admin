import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import './leftNav.less'
const { SubMenu } = Menu
export default class LeftNav extends Component {
  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src="/images/logo.png" alt="" />
          <h1>硅谷管理</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
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
          <Menu.Item key='4'>
            <Icon type="area-chart" />
            <span>图形图标</span>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
