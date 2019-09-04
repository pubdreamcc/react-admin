import React, { Component } from 'react'
import {
  Card, Button
} from 'antd'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {

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
  getOption = (sales, stores) => {
    return {
      title: { text: 'ECharts 入门实例' },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      legend: {
        data: ['库存', '销量']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: sales
        },
        {
          name: '库存',
          type: 'bar',
          data: stores
        }
    ]
    }
  }

  render() {
    const {stores, sales} = this.state
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
