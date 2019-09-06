import React, { Component } from 'react'
import { Card, Icon, Statistic, DatePicker, Timeline } from 'antd'
import moment from 'moment'
import Line from './Line'
import Bar from './Bar'
import './home.less'
const {RangePicker} = DatePicker
const {Item} = Timeline
const dateFormat = 'YYYY/MM/DD'
export default class Home extends Component {

  state = {
    isVisited: true // 默认展示访问量选项卡
  }

  handleChange = (flag) => {
    this.setState({
      isVisited: flag
    })
  }
  render() {
    const {isVisited} = this.state
    return (
      <div className='home'>
        <Card title="商品总量" extra={<Icon type="question-circle" style={{color: 'rgba(0,0,0,.45)'}}/>} style={{ width: 250, float: "left"}} headStyle={{color: 'rgba(0, 0, 0, 0.45)'}}>
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
        <Line />
        <Card
          className="home-content"
          title={<div className="home-menu">
            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
              onClick={this.handleChange.bind(this, true)}>访问量</span>
            <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange.bind(this, false)}>销售量</span>
          </div>}
        extra={<RangePicker size='default'  placeholder={['开始日期', '结束日期']} defaultValue={[moment('2019/01/01', dateFormat), moment('2019/06/01', dateFormat)]} format={dateFormat}/>}
        >
          <Card
            title={isVisited ? '访问趋势' : '销量趋势'}
            className="home-table-left"
            bodyStyle={{padding: 0}}
            extra={<Icon type="reload"/>}
          >
            <Bar/>
          </Card>
          <Card
            title='任务'
            extra={<Icon type="reload"/>}
            className="home-table-right"
          >
            <Timeline>
              <Item color="green">新版本迭代会</Item>
              <Item color="green">完成网站设计初版</Item>
              <Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Item>
              <Item color="#7546C9">
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}
