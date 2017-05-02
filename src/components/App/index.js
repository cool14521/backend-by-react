import React, { Component } from 'react'
//import DevTools from 'mobx-react-devtools'
import styles from './index.less'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Tabs } from 'antd'
import Login from '../../components/Layout/Login.js'
import SiderMenu from '../../components/Layout/SiderMenu.js'
import Network from '../Network/Network.js'
import NetworkEdit from '../Network/NetworkEdit.js'
import Distribution from '../Distribution/Distribution.js'
import DistributionEdit from '../Distribution/DistributionEdit.js'
import Umbrella from '../Umbrella/Umbrella.js'
import UmbrellaEdit from '../Umbrella/UmbrellaEdit.js'
import User from '../User/User.js'
import { getBreadInfo } from '../../utils'
import request from '../../utils/request'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane

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
  }

  componentDidMount() {
    this.props.history.listen((location, type) => {
      const prePath = this.props.location.pathname
      const nextPath = location.pathname
      const { tabBarList, addTab, activeTabChanged } = this.props.appStore
      if (tabBarList.find((item, index) => item.pathname === nextPath) === undefined && (type === 'PUSH' || type === 'POP')) {
        if (prePath === '/' && nextPath === '/users') return
        addTab({ pathname: nextPath, active: true, title: getBreadInfo(nextPath).reverse()[0] })
      }
      if (tabBarList.find((item, index) => item.pathname === nextPath) !== undefined) {
        activeTabChanged(nextPath)
      }
    })
  }

  onTabChange(activeKey) {
    if (this.props.location.pathname === activeKey) return
    this.props.history.push(activeKey)
  }

  onTabEdit(removeKey) {
    const { removeTab, tabBarList } = this.props.appStore
    const activeTab = tabBarList.find((item, index) => item.active === true)
    if (tabBarList.length === 1) return
    removeTab(removeKey)
    if (removeKey === activeTab.pathname) {
      this.props.history.push(tabBarList[tabBarList.length - 1].pathname)
    }
  }

  render() {
    console.log('App be render')
    const { isLogin, administratorInfo, logout, tabBarList } = this.props.appStore
    const activeTab = tabBarList.find((item, index) => item.active === true)
    const pageNode = (
      <Layout className={styles.layoutHasSider}>
        <SiderMenu />
        <Layout>
          <Header className={styles.header}>
            <Menu mode="horizontal" onClick={logout}>
              <SubMenu
                key="1"
                title={administratorInfo.name}
              >
                <Menu.Item key="2">注销</Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Tabs hideAdd type="editable-card" activeKey={activeTab.pathname} onChange={this.onTabChange.bind(this)} onEdit={this.onTabEdit.bind(this)}>
            {
              tabBarList.map((item, index) => {
                return (
                  <TabPane tab={item.title} key={item.pathname} >
                    <Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
                      <Breadcrumb style={{ margin: '12px 0' }}>
                        {getBreadInfo(this.props.location.pathname).map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                      </Breadcrumb>
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
                        </Switch>
                      </div>
                    </Content>
                  </TabPane>
                )
              })
            }
          </Tabs>
        </Layout>
      </Layout>
    )
    return isLogin ? pageNode : <Login />
  }
}

export default App