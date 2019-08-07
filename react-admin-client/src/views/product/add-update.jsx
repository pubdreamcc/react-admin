import React, { Component } from 'react'
import {Card, Icon, Button} from 'antd'
export default class ProductAddUpdate extends Component {
  render() {
    const isUpdate = true
    const title = (<span><Button type='primary' onClick={() => this.props.history.goBack()} style={{marginRight: 10}}><Icon type='arrow-left'/></Button>{isUpdate ? '修改商品' : '添加商品'}</span>)
    return (
      <Card title={title}>
      </Card>
    )
  }
}
