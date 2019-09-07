import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import ProductDetail from './detail'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import './product.less'
import NotFound from '../not-found/NotFound'
export default class Product extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <Switch>
          <Route path='/product' exact component={ProductHome}></Route>
          <Route path='/product/detail' exact component={ProductDetail}></Route>
          <Route path='/product/addupdate' exact component={ProductAddUpdate}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    )
  }
}
