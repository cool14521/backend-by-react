import {
  observable,
  action,
  computed,
  useStrict,
  runInAction,
  toJS,
  intercept
} from "MobX"
import request from '../utils/request'

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
    const data = await request.post('/login')
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