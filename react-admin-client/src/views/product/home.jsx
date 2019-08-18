import React, { Component } from 'react'
import {getProductListIf, searchProductIf, updateStatusIf} from '../../api'
import {PAGE_SIZE} from '../../utils/constance'
import {
  Card,
  Button,
  Table,
  Icon,
  Select,
  Input,
  message
} from 'antd'
import LinkButton from '../../components/link-button/LinkButton'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
const Option = Select.Option
export default class ProductHome extends Component {
  state = {
    product: [], // 商品信息列表
    total: 0, // 商品的总数量
    loading: false, // 表格数据是否加载中
    searchType: 'productName', // 根据那个字段搜索
    searchName: '' // 搜索关键字
  }
  /*
    对商品进行上下架
  */
  updateStatus = async (productId, status) => {
    // 发ajax对商品进行上下架
    const ret = await updateStatusIf(productId, status)
    if (ret.status === 0) {
      // 上下架成功
      message.success('更新成功！')
      this.getProductList(this.pageNum)
    }
  }
  /*
    获取商品分页列表
  */
  getProductList = async (pageNum) => {
    // 保存当前页码
    this.pageNum = pageNum
    // 从 state 中获取 searchName searchType
    const {searchName, searchType} = this.state
    // 表格数据加载中
    this.setState({loading: true})
    let ret
    // 发送Ajax获取商品, 如果有搜索关键字就是搜索分页
    if (searchName) {
      ret = await searchProductIf(pageNum, PAGE_SIZE, searchType, searchName) 
    } else {
      ret = await getProductListIf(pageNum, PAGE_SIZE)
    }
    this.setState({loading: false})
    if (ret.status === 0) {
      // 获取商品成功
      const {total, list} = ret.data
      // 更新 state
      this.setState({total, product: list})
    }
  }
  /*
    初始化表格列的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        render: (product) => <span>￥{product.price}</span>
      },
      {
        title: '状态',
        render: (product) => {
          const {status, _id} = product
          return (<span style={{display: 'flex', flexDirection: 'column'}}><Button type='primary' onClick={this.updateStatus.bind(this, _id, status === 1 ? 2 : 1)}>{status === 1 ? '下架' : '上架'}</Button><span>{status === 1 ? '在售' : '已下架'}</span></span>)
        }
      },
      {
        title: '操作',
        render: (product) => <LinkButton><span style={{marginRight: 15}} onClick={this.showDetail.bind(this, product)}>详情</span><span onClick={this.showUpdate.bind(this, product)}>修改</span></LinkButton>
      }
    ]
  }
  /*
    显示商品详情路由
 */
  showDetail = (product) => {
    // 保存商品到local storage
    storageUtils.saveProduct(product)
    // 保存商品信息到内存
    memoryUtils.product = product
    // 跳转路由
    this.props.history.push('/product/detail')
  }
  /*
    显示商品修改/添加路由
  */
  showUpdate = product => {
    // 保存商品到local storage
    storageUtils.saveProduct(product)
    // 保存商品信息到内存
    memoryUtils.product = product
    // 跳转路由
    this.props.history.push('/product/addupdate')
  }
  componentWillMount () {
    // 获取商品列表
    this.getProductList(1)
    // 初始化表格列
    this.initColumns()
  }
  render() {
    const {product, loading, total, searchName, searchType} = this.state
    const title = (
      <span>
        <Select value={searchType} style={{width: 130}} onChange={value => this.setState({searchType: value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}} value={searchName} onChange={event => this.setState({searchName: event.target.value})}/>
        <Button type='primary' onClick={this.getProductList.bind(this, 1)}>搜索</Button>
      </span>
    )
    const extra = <Button type='primary' onClick={this.showUpdate.bind(this, {})}><Icon type='plus'></Icon>添加商品</Button>
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true, total: total, onChange: this.getProductList, current: this.pageNum}}
          dataSource={product}
          columns={this.columns}
          rowKey='_id'
        />
      </Card>
    )
  }
}
