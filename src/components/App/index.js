import React, { Component } from 'react'
//import DevTools from 'mobx-react-devtools'
import styles from './index.less'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import Login from '../Login'
import SiderMenu from '../SiderMenu'
import Network from '../Network'
import Distribution from '../Distribution'
import Umbrella from '../Umbrella'
import User from '../User'


import { debounce } from '../../utils'

const { Header, Content, Footer, Sider } = Layout

@inject('appStore') @observer
class App extends Component {

  constructor(props) {
    super(props)
    window.onresize = () => debounce(props.appStore.changeWindowSize)
  }

  componentDidMount() {
    //console.log(this.props.match)
  }



  render() {

    const { isLogin, onCollapse, collapsed, siderSelectedInfo } = this.props.appStore
    const { history } = this.props

    console.log(666)

    const pageNode = (
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}>
          <div className={styles.logo} />
          <SiderMenu />
        </Sider>
        <Layout>
          <Header>
          </Header>
          <Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              {siderSelectedInfo.keyPath.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
            </Breadcrumb>
            <div className={styles.content}>
              <Route exact path="/" component={User} />
              <Route path="/users" component={User} />
              <Route path="/umbrellas" component={Umbrella} />
              <Route path="/networks" component={Network} />
              <Route path="/distribution" component={Distribution} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )

    return isLogin ? pageNode : <Login />
  }
}

export default App