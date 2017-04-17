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
import UmbrellaEdit from '../UmbrellaEdit'
import User from '../User'



import { debounce } from '../../utils'

const { Header, Content, Sider } = Layout

@inject('appStore') @observer
class App extends Component {

  constructor(props) {
    super(props)
    window.onresize = () => debounce(props.appStore.changeWindowSize)
  }
   
  render() {

    console.log(999)

    const { isLogin, onCollapse, collapsed, siderSelectedInfo } = this.props.appStore
    const { history } = this.props
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
          <Header>
          </Header>
          <Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              {siderSelectedInfo.keyPath.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
            </Breadcrumb>
            <div className={styles.content}>
              <Route exact path="/" component={User} />
              <Route path="/users" component={User} />
              <Route exact path="/umbrellas" component={Umbrella} />
              <Route path="/umbrellasEdit" component={UmbrellaEdit} />
              <Route path="/networks" component={Network} />
              <Route path="/networksEdit" component={Network} />
              <Route path="/distribution" component={Distribution} />
              <Route path="/distributionEdit" component={Distribution} />
            </div>
          </Content>
        </Layout>
      </Layout>
    )

    return isLogin ? pageNode : <Login />
  }
}

export default App