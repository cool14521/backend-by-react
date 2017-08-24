import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Route, withRouter, Switch} from 'react-router-dom'
import Network from './Network/Network'
import NetworkEdit from './Network/NetworkEdit'
import Distribution from './Distribution/Distribution'
import DistributionEdit from './Distribution/DistributionEdit'
import Umbrella from './Umbrella/Umbrella'
import UmbrellaEdit from './Umbrella/UmbrellaEdit'
import User from './User/User'
import Dashboard from './Dashboard/dashboard'

import styles from './Layout/Main.less'

//主路由- 绑定URL和页面组件
@withRouter @observer
class MainRoute extends Component {

  render() {

    return (
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/users" component={User}/>
        <Route path="/umbrellas" component={Umbrella}/>
        <Route path="/umbrellasEdit" component={UmbrellaEdit}/>
        <Route path="/networks" component={Network}/>
        <Route path="/networksEdit" component={NetworkEdit}/>
        <Route path="/distribution" component={Distribution}/>
        <Route path="/distributionEdit" component={DistributionEdit}/>
        <Route render={() => <h1 className={styles.noMatch}>找不到此页面</h1>}/>
      </Switch>
    )
  }
}

export default MainRoute
