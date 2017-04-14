import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './index.less'


@inject('appStore') @observer
class Umbrella extends Component {
  render() {
    return (
      <div>
        Umbrella
      </div>
    )
  }
}

export default Umbrella