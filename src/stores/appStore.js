import {observable, action, computed, runInAction} from "mobx"

import {login} from '../services/app'
import {getCloseReport} from '../services/report'

import {getBreadInfo} from '../utils'

import {getPathName} from './MenuStore'
class appStore {

  @observable administratorInfo
  @observable isLogin
  @observable siderMode
  @observable collapsed
  @observable loading
  @observable tabBarList
  @observable CloseReportObj
  constructor() {
    this.administratorInfo = {
      name: 'sundaypig',
      level: 3
    }
    this.CloseReportObj = {
      total: 0,
      rows: []
    };
    if (localStorage.getItem("isLogin")) {
      //  console.log(localStorage.getItem("isLogin"))
      this.isLogin = true;
      localStorage.setItem("isLogin", true);
    } else {
      this.isLogin = false;
      localStorage.setItem("isLogin", false);

    }

    this.collapsed = false
    this.siderMode = 'inline'
    this.loading = false
    this.tabBarList = [
      {
        pathname: window.location.pathname === '/'
          ? '/dashboard'
          : window.location.pathname,
        active: true,
        title: window.location.pathname === '/'
          ? '首页'
          : getPathName(window.location.pathname)
      }
    ]
  }

  @action.bound addTab(tab) {
    this.tabBarList.map(item => item.active = false)
    this.tabBarList.push(tab)
  }

  @action.bound activeTabChanged(pathname) {
    this.tabBarList.map(item => item.active = item.pathname === pathname)
  }

  @action.bound removeTab(pathname) {
    const removeKey = this.tabBarList.findIndex((item, index) => pathname === item.pathname)
    this.tabBarList.splice(removeKey, 1)
    this.tabBarList[this.tabBarList.length - 1].active = true
  }

  @action.bound onCollapse(collapsed) {
    this.collapsed = !this.collapsed
    this.siderMode = collapsed
      ? 'vertical'
      : 'inline'
  }

  @action loginSubmit = async values => {
    try {
      const data = await login(values)
      runInAction(() => {
        this.isLogin = true
        localStorage.setItem("isLogin", true);
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action.bound logout() {
    this.isLogin = false;
    localStorage.setItem("isLogin", false);
  }

  @action showLoading() {
    this.loading = true
  }

  @action hideLoading() {
    this.loading = false
  }

  //获取报表
  //The action only decorates the current function, but the callback is a nother function
  @action GetCloseReport = async values => {
    const data = await getCloseReport(values)
    runInAction("update state after fetching data", () => {
      this.CloseReportObj = data
    })

  }
}

export default new appStore()
