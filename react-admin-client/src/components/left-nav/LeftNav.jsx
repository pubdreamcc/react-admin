import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions.js'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import './leftNav.less'
const { SubMenu } = Menu
class LeftNav extends Component {

  /*
    判断当前用户是否对menuList中的item有对应权限
  */
  hasAuth = (item) => {
    /*
      1. 当前用户是 admin ，无需判断，全部能访问；
      2. 当前item有isPublic属性，且为true，无需判断，可以访问
      3. 当前用户有此item的权限，item的key 在 当前用户的权限数组中
      4. 当前用户有此item的孩子权限，显示item和item孩子菜单项
    */
    const { key, isPublic} = item
    const {username} = this.props.user
    const menus = this.props.user.role.menus
    if (username === 'admin' || isPublic || menus.includes(key)) {
      return true
    } else if (item.children) {
      // 4. 当前用户有此item的孩子权限，显示item和item孩子菜单项
      return !!item.children.find(child => menus.includes(child.key))
    }
    return false
  }

  handleClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname.replace(/^\/product[\D]+/, '/product')
    return (
      menuList.map(item => {
        // 做一些判断，判断当前item所对应的菜单项，当前用户是否具有权限访问，如果没有，则不显示，动态设置权限问题
        if (this.hasAuth(item)) {
          if (!item.children) {
            if (item.key === path) {
              this.props.setHeadTitle(item.title)
            }
            return (
            <Menu.Item key={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
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
        } else {
          return null
        }
      })
    )
  }
  componentWillMount () {
    this.menu = this.getMenuNodes(menuList)
    console.log(this.menu)
  }
  render() {
    console.log('leftNav--render')
    const path = this.props.location.pathname.replace(/^\/product[\D]+/, '/product')
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

export default connect(
  state => ({user: state.user}),
  {setHeadTitle}
)(withRouter(LeftNav))