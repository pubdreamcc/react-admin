import React, { Component } from 'react'
import {List, Icon, Card, Button} from 'antd'
import memoryUtils  from '../../utils/memoryUtils.js'
import { BASE_IMG_URL } from '../../utils/constance.js'
import {getCategoryIf} from '../../api/index'
const Item = List.Item
export default class ProductDetail extends Component {
  state = {
    categoryName1: '', // 一级分类名称
    categoryName2: '', // 二级分类名称
  }
  async componentDidMount () {
    const {pCategoryId, categoryId} = memoryUtils.product
    // 发送请求获取商品的分类名称
    if (pCategoryId === '0') {
      // 当前商品属于一级分类
      const ret = await getCategoryIf(categoryId)
      if (ret.status === 0) {
        const categoryName1 = ret.data.name
        this.setState({categoryName1})
      }
    } else {
      // 当前商品属于二级分类
      const rets = await Promise.all([getCategoryIf(pCategoryId), getCategoryIf(categoryId)])
      const categoryName1 = rets[0].data.name
      const categoryName2 = rets[1].data.name
      this.setState({categoryName1, categoryName2})
    }
  }
  render() {
    console.log(memoryUtils.product)
    const {desc, detail, imgs, name, price} = memoryUtils.product
    const {categoryName1, categoryName2} = this.state
    const title = (<span><Button type='primary' style={{marginRight: 10}} onClick={this.props.history.goBack.bind(this)}><Icon type='arrow-left'/></Button>商品详情</span>)
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>商品价格：</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className='left'>所属分类：</span>
            <span>{categoryName2 === '' ? categoryName1 : categoryName1 + '-->' + categoryName2}</span>
          </Item>
          <Item>
            <span className='left'>商品图片：</span>
            <span>
              {
                imgs.map(img => 
                  <img 
                    src={BASE_IMG_URL + img} 
                    alt='商品图片' 
                    key={img}
                    className='productImg'
                  />
                )
              }
            </span>
          </Item>
          <Item>
            <span className='left'>商品详情：</span>
            <span dangerouslySetInnerHTML={{__html: detail}}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
