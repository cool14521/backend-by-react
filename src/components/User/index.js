import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './index.less'


@inject('appStore') @observer
class User extends Component {
  render() {
    return (
      <div>
        user
      </div>
    )
  }
}

export default User