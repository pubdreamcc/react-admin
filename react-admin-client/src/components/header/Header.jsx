import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions.js'
import { Modal } from 'antd'
import formatDate from '../../utils/dateUtils'
// import menuList from '../../config/menuConfig'
import { weatherIf } from '../../api/index'
import './header.less'
const { confirm } = Modal
class Header extends Component {
  state = {
    currentTime: formatDate(Date.now()),
    weather: '',
    dayPictureUrl: ''
  }
  getTime = () => {
    // 每隔一秒钟获取当前时间
    this.timer = setInterval(() => {
      const currentTime = formatDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }
  // getTitle = (menuList) => {
  //   const path = this.props.location.pathname.replace(/^\/product[\D]+/, '/product')
  //   // 通过当前路由找到对应的菜单项名称
  //   let title
  //   menuList.forEach(item => {
  //     if (item.children) {
  //       // 有子级菜单
  //       const cItem = item.children.find(item => {return item.key === path})
  //       if (cItem) title = cItem.title
  //     } else {
  //       // 无子级菜单
  //       if (item.key === path) title = item.title
  //     }
  //   })
  //   return title
  // }
  getWeather = async () => {
    const {weather, dayPictureUrl} = await weatherIf('深圳')
    this.setState({weather, dayPictureUrl})
  }
  logout = () => {
    confirm({
      content: '确定退出吗？',
      okText: '确定',
      cancelText: '取消',
      onOk:() => {
        this.props.logout()
      }
    })
  }
  componentWillMount () {
    // 获取时间
    this.getTime()
    // 获取天气
    this.getWeather()
  }
  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.timer)
  }
  render() {
    // 获取标题
    // this.title = this.getTitle(menuList)
    this.title = this.props.headTitle
    return (
      <div className='Header'>
        <div className="Header-top">
          <span>欢迎，{this.props.user.username}</span>
          <button className='link-btn' onClick={this.logout}>登出</button>
        </div>
        <div className="Header-bottom">
          <div className="Header-bottom-left">{this.title}</div>
          <div className="Header-bottom-right">
            <span>{this.state.currentTime}</span>
            <img src={this.state.dayPictureUrl} alt=""/>
            <span>{this.state.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({headTitle: state.setHeadTitle, user: state.user}),
  {logout}
)(withRouter(Header))