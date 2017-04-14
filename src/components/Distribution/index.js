import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './index.less'


@inject('appStore') @observer
class Distribution extends Component {
  render() {
    return (
      <div>
        Distribution
      </div>
    )
  }
}

export default Distribution