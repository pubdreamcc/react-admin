import React, { Component } from 'react'
import { Card, Icon, Statistic } from 'antd'
import './home.less'
export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <Card title="商品总量" extra={<Icon type="question-circle" style={{color: 'rgba(0,0,0,.45)'}}/>} style={{ width: 250 }} headStyle={{color: 'rgba(0, 0, 0, 0.45)'}}>
        <Statistic
            value={1128163}
            suffix="个"
            style={{fontWeight: 'bolder'}}
          />
          <Statistic
            value={15}
            valueStyle={{fontSize: 15}}
            prefix={'周同比'}
            suffix={<div>%<Icon style={{color: 'red', marginLeft: 10}} type="arrow-down"/></div>}
          />
          <Statistic
            value={10}
            valueStyle={{fontSize: 15}}
            prefix={'日同比'}
            suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
          />
        </Card>
      </div>
    )
  }
}
