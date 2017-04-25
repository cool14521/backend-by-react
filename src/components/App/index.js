import React, { Component } from 'react'
//import DevTools from 'mobx-react-devtools'
import styles from './index.less'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { Route, withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import Login from '../../components/Layout/Login'
import SiderMenu from '../../components/Layout/SiderMenu'
import Network from '../Network/Network'
import NetworkEdit from '../Network/Network'
import Distribution from '../Distribution/Distribution'
import DistributionEdit from '../Distribution/DistributionEdit'
import Umbrella from '../Umbrella/Umbrella'
import UmbrellaEdit from '../Umbrella/UmbrellaEdit'
import User from '../User/User'
import { breadConfig } from '../../utils'
import request from '../../utils/request'

const { Header, Content, Sider } = Layout

/**
 * 面包屑
 */
const Bread = inject('appStore')(withRouter((observer(({ history }) => {
  let breadInfo = breadConfig[Object.keys(breadConfig)[Object.keys(breadConfig).indexOf(history.location.pathname)]]
  if (history.location.pathname === '/') {
    breadInfo = breadConfig['/users']
  }
  return (
    <Breadcrumb style={{ margin: '12px 0' }}>
      {breadInfo.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
    </Breadcrumb>
  )
}))))

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
    props.history.listen((...args) => {
      //console.log(args)
    })
  }

  componentDidMount() {

  }

  render() {
    console.log('App be render')
    const { isLogin, collapsed, onCollapse } = this.props.appStore
    const pageNode = (
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}>
          <div className={styles.logo}>雨伞分享管理</div>
          <SiderMenu />
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
            <Bread />
            <div className={styles.content}>
              <Route exact path="/" component={User} />
              <Route path="/users" component={User} />
              <Route path="/umbrellas" component={Umbrella} />
              <Route path="/umbrellasEdit" component={UmbrellaEdit} />
              <Route path="/networks" component={Network} />
              <Route path="/networksEdit" component={NetworkEdit} />
              <Route path="/distribution" component={Distribution} />
              <Route path="/distributionEdit" component={DistributionEdit} />
            </div>
          </Content>
        </Layout>
      </Layout>
    )

    return isLogin ? pageNode : <Login />
  }
}

export default App