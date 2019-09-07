import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions.js'
import {Row, Col, Button} from 'antd'
import './NotFound.less'
class NotFound extends Component {

  goHome = () => {
    // 跳转到首页
    this.props.setHeadTitle('首页')
    this.props.history.replace('/home')
  }
  render() {
    return (
      <Row className='not-found'>
        <Col span={12} className='left'></Col>
        <Col span={12} className='right'>
          <h1>404</h1>
          <h2>抱歉，你要的页面暂时失联了...</h2>
          <div><Button type='primary' onClick={this.goHome}>回到首页</Button></div>
        </Col>
      </Row>    
    )
  }
}

export default connect(
  state => ({}),
  {setHeadTitle}
)(NotFound)