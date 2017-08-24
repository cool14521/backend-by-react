import {Layout, Menu, Icon} from 'antd'
import {observer, inject} from 'mobx-react'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {breadConfig} from '../../utils'
import styles from './SiderMenu.less'
import {arrayToTree, getSelectedKeys} from '../../utils/menu'
import {MenuInfo} from '../../stores/MenuStore'

const SubMenu = Menu.SubMenu
const {Sider} = Layout

@inject('appStore')@withRouter @observer
class SiderMenu extends Component {

  onSiderClick(e) {
    const {location, history} = this.props
    if (location.pathname === e.key)
      return
    history.push(e.key)
  }

  render() {
    let menu_arr = MenuInfo

    // 生成树状
    const menuTree = arrayToTree(menu_arr.filter(_ => _.pid !== '-1'), 'id', 'pid')
    const levelMap = {}
    // 递归生成菜单
    const getMenus = (menuTreeN, siderFoldN) => {
      return menuTreeN.map((item) => {
        if (item.children) {
          if (item.pid) {
            levelMap[item.id] = item.pid
          }
          return (
            <Menu.SubMenu key={item.id} title={< span > {
              item.icon && <Icon type={item.icon}/>
            }
            {
              (!siderFoldN || !menuTree.includes(item)) && item.name
            } < /span>}>
              {getMenus(item.children, siderFoldN)}
            </Menu.SubMenu>
          )
        }
        return (
          <Menu.Item key={item.path}>
            {item.icon && <Icon type={item.icon}/>}
            {(!siderFoldN || !menuTree.includes(item)) && item.name}
          </Menu.Item>
        )
      })
    }
    //菜单条目
    const menuItems = getMenus(menuTree, false)
    //选中高亮
    let SelectedKeys = getSelectedKeys(menu_arr)

    const {appStore, location} = this.props

    return (
      <Sider collapsible collapsed={appStore.collapsed} onCollapse={appStore.onCollapse}>
        <div className={styles.logo} style={{
          visibility: appStore.collapsed
            ? 'hidden'
            : 'visible'
        }}>后台管理</div>

        <Menu theme="dark" mode={appStore.siderMode} defaultSelectedKeys={SelectedKeys} defaultOpenKeys={['4']} onClick={this.onSiderClick.bind(this)}>

          {menuItems}

        </Menu>

      </Sider>
    )
  }
}

export default SiderMenu
