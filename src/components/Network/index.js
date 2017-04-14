import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './index.less'


@inject('appStore') @observer
class Network extends Component {
  render() {
    return (
      <div>
        Network
      </div>
    )
  }
}

export default Network