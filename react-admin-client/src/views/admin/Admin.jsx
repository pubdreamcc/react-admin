import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
export default class Admin extends Component {
  render() {
    if (!memoryUtils.user._id || !memoryUtils.user.username) {
      // 没有登录，内存中无user数据
      return <Redirect to='/login'/>
    }
    return (
      <div>
        hello {memoryUtils.user.username}
      </div>
    )
  }
}
