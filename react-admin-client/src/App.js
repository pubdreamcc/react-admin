// 根组件
import React, { Component } from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from './views/login/Login'
import Admin from './views/admin/Admin'
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
