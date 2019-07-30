import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductDetail from './detail'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/product' component={ProductHome} exact></Route>
          <Route path='/product/detail' component={ProductDetail}></Route>
          <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
          <Redirect to='/product'></Redirect>
        </Switch>
      </div>
    )
  }
}
