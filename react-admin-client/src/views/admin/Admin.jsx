import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd'
import Header from '../../components/header/Header'
import LeftNav from '../../components/left-nav/LeftNav'
import Home from '../../views/home/Home'
import Category from '../../views/category/Category'
import User from '../../views/user/User'
import Product from '../../views/product/Product'
import Role from '../../views/role/Role'
import Pie from '../../views/charts/Pie'
import Line from '../../views/charts/Line'
import Bar from '../../views/charts/Bar'
const { Footer, Sider, Content } = Layout
class Admin extends Component {
  render() {
    if (!this.props.user._id || !this.props.user.username) {
      // 没有登录，内存中无user数据
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider><LeftNav/></Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor: '#fff', margin: '15px'}}>
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/product' component={Product}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/charts/pie' component={Pie}></Route>
              <Route path='/charts/line' component={Line}></Route>
              <Route path='/charts/bar' component={Bar}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: 'rgba(204, 204, 204, 1)'}}>推荐使用Google浏览器，可以获得更加页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({user: state.user})
)(Admin)