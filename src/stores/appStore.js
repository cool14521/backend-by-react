import {
  observable,
  action,
  computed,
  runInAction,
  toJS,
  intercept
} from "mobx"

import { login } from '../services/app'

class appStore {

  @observable
  administratorInfo
  @observable
  isLogin
  @observable
  siderMode
  @observable
  collapsed
  @observable
  loading

  constructor() {
    this.administratorInfo = {
      name: 'sundaypig',
      level: 3
    }
    this.isLogin = false
    this.collapsed = false
    this.siderMode = 'inline'
    this.loading = false
  }

  @action.bound
  onCollapse(collapsed) {
    this.collapsed = !this.collapsed
    this.siderMode = collapsed ? 'vertical' : 'inline'
  }

  @action
  loginSubmit = async values => {
    const data = await login(values)
    runInAction(() => {
      console.log(data)
      this.isLogin = true
    })
  }

  @action
  logout() {
    this.isLogin = false
  }

  @action
  showLoading() {
    this.loading = true
  }

  @action
  hideLoading() {
    this.loading = false
  }

}

export default new appStore()