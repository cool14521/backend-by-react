import {
  observable,
  action,
  computed,
  useStrict,
  runInAction,
  toJS,
  intercept
} from "MobX"





class appStore {

  @observable
  administratorInfo
  @observable
  isLogin
  @observable
  isSmallScreen
  @observable
  siderMode
  @observable
  collapsed
  @observable
  siderSelectedInfo

  constructor() {
    this.administratorInfo = {
      name: 'sundaypig',
      level: 3
    }
    this.isLogin = false
    this.collapsed = false
    this.siderMode = 'inline'
    this.isSmallScreen = document.body.clientWidth < 769
    this.siderSelectedInfo = {
      key: '用户管理',
      keyPath: ['数据管理', '用户管理']
    }
    // intercept(this.siderSelectedInfo, 'key', change => {
    //   console.log(change.newValue + 'dsda')
    //   return null
    // })
  }

  @action.bound
  changeWindowSize() {
    this.isSmallScreen = document.body.clientWidth < 769
  }

  @action.bound
  onCollapse(collapsed) {
    this.collapsed = !this.collapsed
    this.siderMode = collapsed ? 'vertical' : 'inline'
  }

  @action.bound
  onSiderClick(e) {
    this.siderSelectedInfo = {
      key: e.key.split('-')[0],
      keyPath: e.keyPath.map(item => item.split('-')[0]).reverse()
    }
  }

  @action
  loginSubmit(validateFieldsAndScroll) {
    validateFieldsAndScroll((errors, values) => {
      if (errors) return
      runInAction(() => { this.isLogin = true })
    })
  }

  @action
  logout() {
    this.isLogin = false
  }

}

export default new appStore()