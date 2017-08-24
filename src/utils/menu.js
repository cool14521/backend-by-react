import React from 'react'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import {Menu, Icon} from 'antd'

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
*获取菜单选中
*/

export const getSelectedKeys = (menu) => {

  // 寻找选中路由
  let currentMenu
  let defaultSelectedKeys
  for (let item of menu) {
    if (item.path && pathToRegexp(item.path).exec(location.pathname)) {
      currentMenu = item
      break
    }
  }
  const getPathArray = (array, current, pid, id) => {
    let result = [String(current[id])]
    const getPath = (item) => {
      if (item && item[pid]) {
        result.unshift(String(item[pid]))
        getPath(queryArray(array, item[pid], id))
      }
    }
    getPath(current)
    return result
  }
  if (currentMenu) {
    defaultSelectedKeys = getPathArray(menu, currentMenu, 'pid', 'path')
  }
  return defaultSelectedKeys
}

/**
 * 数组内查询-getSelectedKeys使用
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key && _[keyAlias] !== 1)
  if (item.length) {
    return item[0]
  }
  return null
}

// 递归生成菜单
export const getMenus = (menuTreeN, siderFoldN) => {
  const levelMap = {}

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
