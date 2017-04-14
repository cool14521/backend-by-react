import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const SubMenu = Menu.SubMenu


@inject('appStore') @observer @withRouter
class SiderMenu extends Component {


  togglePage(e) {
    const { appStore, history } = this.props
    const url = e.key.split('-')[1]
    if (e.key.split('-')[0] === appStore.siderSelectedInfo.key && history.location.pathname !== '/') return
    appStore.onSiderClick(e)
    history.push(url)
  }


  render() {

    const { appStore } = this.props

    return (
      <Menu
        theme="dark"
        mode={appStore.siderMode}
        defaultSelectedKeys={['用户管理-/users']}
        defaultOpenKeys={['数据管理']}
        onClick={this.togglePage.bind(this)}
      >
        <SubMenu
          key="数据管理"
          title={<span><Icon type="user" /><span className="nav-text">数据管理</span></span>}
        >
          <Menu.Item key="用户管理-/users">用户管理</Menu.Item>
          <Menu.Item key="雨伞管理-/umbrellas">雨伞管理</Menu.Item>
          <Menu.Item key="网点管理-/networks">网点管理</Menu.Item>
          <Menu.Item key="分配管理-/distribution">分配管理</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default SiderMenu