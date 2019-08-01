import React, { Component } from 'react'
import {List, Icon, Card, Button} from 'antd'
import memoryUtils  from '../../utils/memoryUtils.js'
const Item = List.Item
export default class ProductDetail extends Component {
  render() {
    const title = (<span><Button type='primary' style={{marginRight: 10}}><Icon type='arrow-left'/></Button>商品详情</span>)
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名称：</span>
            <span>小米手机</span>
          </Item>
          <Item>
            <span className='left'>商品描述：</span>
            <span>小米手机</span>
          </Item>
          <Item>
            <span className='left'>商品价格：</span>
            <span>小米手机</span>
          </Item>
          <Item>
            <span className='left'>所属分类：</span>
            <span>小米手机</span>
          </Item>
          <Item>
            <span className='left'>商品图片：</span>
            <span>小米手机</span>
          </Item>
          <Item>
            <span className='left'>商品详情：</span>
            <span>小米手机</span>
          </Item>
        </List>
      </Card>
    )
  }
}
