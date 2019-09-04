import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {Button, Card} from 'antd'
export default class Line extends Component {

  state = {
    sales: [60, 20, 70, 30, 45, 60, 54], // 每月的销售量
    stores: [20, 34, 18, 50, 49, 20, 33] // 每月的库存
  }

  /*
    更新库存和销量，（库存和销量在原先基础上 加 1）
  */

  update = () => {
    this.setState((state) => ({
      sales: state.sales.map(item => item + 1),
      stores: state.stores.reduce((prev, curr) => {
        prev.push(curr + 1)
        return prev
      }, [])
    }))
  }


  /*
    指定图表的配置项和数据
  */

  getOption = (sales, stores) => ({
    title: {
      text: 'ECharts 入门实例'
    },
    tooltip: {},
    legend: {
      data: ['库存', '销量']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', {value: 'Tue', textStyle: {fontSize: 20, color: '#1DA57A'}}, 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '库存',
        type: 'line',
        data: stores,
        itemStyle: {
          color: '#1DA57A'
        }
      },
      {
        name: '销量',
        type: 'line',
        data: sales
      }
    ] 
  })

  render() {
    const {sales, stores} = this.state
    return (
      <Card
        title={<Button type='primary' onClick={this.update}>更新</Button>}
      >
        <ReactEcharts 
          option={this.getOption(sales, stores)}
        />
      </Card>
    )
  }
}
