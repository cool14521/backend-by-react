import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { breadConfig } from '../../utils'


const SubMenu = Menu.SubMenu


@inject('appStore') @withRouter @observer
class SiderMenu extends Component {


  onSiderClick(e) {
    const { history } = this.props
    if (history.location.pathname === e.key) return
    history.push(e.key)
  }


  render() {

    const { appStore, history } = this.props

    let defaultSelectedKeys = ''
    switch (true) {
      case['/', '/users'].indexOf(history.location.pathname) !== -1:
        defaultSelectedKeys = '/users'
        break
      case['/umbrellas', '/umbrellasEdit'].indexOf(history.location.pathname) !== -1:
        defaultSelectedKeys = '/umbrellas'
        break
      case['/networks', '/networksEdit'].indexOf(history.location.pathname) !== -1:
        defaultSelectedKeys = '/networks'
        break
      case['/distribution', '/distributionEdit'].indexOf(history.location.pathname) !== -1:
        defaultSelectedKeys = '/distribution'
        break
    }

    return (
      <Menu
        theme="dark"
        mode={appStore.siderMode}
        defaultSelectedKeys={[defaultSelectedKeys]}
        selectedKeys={[defaultSelectedKeys]}
        defaultOpenKeys={['数据管理']}
        onClick={this.onSiderClick.bind(this)}
      >
        <SubMenu
          key="数据管理"
          title={<span><Icon type="user" /><span className="nav-text">数据管理</span></span>}
        >
          <Menu.Item key="/users">用户管理</Menu.Item>
          <Menu.Item key="/umbrellas">雨伞管理</Menu.Item>
          <Menu.Item key="/networks">网点管理</Menu.Item>
          <Menu.Item key="/distribution">分配管理</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default SiderMenu