import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header/Header'
import LeftNav from '../../components/left-nav/LeftNav'
const { Footer, Sider, Content } = Layout
export default class Admin extends Component {
  render() {
    if (!memoryUtils.user._id || !memoryUtils.user.username) {
      // 没有登录，内存中无user数据
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider><LeftNav/></Sider>
        <Layout>
          <Header></Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
