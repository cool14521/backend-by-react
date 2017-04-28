import React, { Component } from 'react'
//import DevTools from 'mobx-react-devtools'
import styles from './index.less'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import Login from '../../components/Layout/Login.js'
import SiderMenu from '../../components/Layout/SiderMenu.js'
import Network from '../Network/Network.js'
import NetworkEdit from '../Network/NetworkEdit.js'
import Distribution from '../Distribution/Distribution.js'
import DistributionEdit from '../Distribution/DistributionEdit.js'
import Umbrella from '../Umbrella/Umbrella.js'
import UmbrellaEdit from '../Umbrella/UmbrellaEdit.js'
import User from '../User/User.js'
import { breadConfig } from '../../utils'
import request from '../../utils/request'

const { Header, Content, Sider } = Layout

/**
 * 面包屑
 */
const Bread = withRouter((observer(({ location }) => {
  let breadInfo = breadConfig[Object.keys(breadConfig)[Object.keys(breadConfig).indexOf(location.pathname)]]
  if (location.pathname === '/') {
    breadInfo = breadConfig['/users']
  }
  return (
    <Breadcrumb style={{ margin: '12px 0' }}>
      {breadInfo.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
    </Breadcrumb>
  )
})))


/**
 * 主程序
 * 
 * @class App
 * @extends {Component}
 */
@inject('appStore') @withRouter @observer
class App extends Component {

  constructor(props) {
    super(props)
    //props.history.listen((...args) => {})
  }

  render() {
    console.log('App be render')
    const { isLogin } = this.props.appStore
    const pageNode = (
      <Layout className={styles.layoutHasSider}>
        <SiderMenu />
        <Layout>
          <Header></Header>
          <Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
            <Bread />
            <div className={styles.content}>
              <Switch>
                <Route exact path="/" component={User} />
                <Route path="/users" component={User} />
                <Route path="/umbrellas" component={Umbrella} />
                <Route path="/umbrellasEdit" component={UmbrellaEdit} />
                <Route path="/networks" component={Network} />
                <Route path="/networksEdit" component={NetworkEdit} />
                <Route path="/distribution" component={Distribution} />
                <Route path="/distributionEdit" component={DistributionEdit} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    )

    return isLogin ? pageNode : <Login />
  }
}

export default App