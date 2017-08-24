import lodash from 'lodash'
export const MenuInfo = [
  {
    id: '2',
    icon: 'laptop',
    name: 'Dashboard',
    path: '/dashboard'
  }, {
    id: '3',
    pid: '1',
    name: '报表',
    icon: 'search',
    path: '/report'
  }, {
    id: '4',
    pid: '1',
    name: '数据管理',
    icon: 'camera-o'
  }, {
    id: '41',
    pid: '4',
    name: '用户管理',
    icon: 'heart-o',
    path: '/users'
  }, {
    id: '42',
    pid: '4',
    name: '雨伞管理',
    icon: 'database',
    path: '/umbrellas'
  }, {
    id: '42',
    pid: '4',
    name: '网点管理',
    icon: 'api',
    path: '/networks'
  }, {
    id: '42',
    pid: '4',
    name: '分配管理',
    icon: 'api',
    path: '/distribution'
  }
]

export const getPathName = (path) => {

  let PathName = lodash.find(MenuInfo, function(o) {
    return o.path == path;
  });
  if (lodash.has(PathName, 'name')) {
    return PathName.name
  } else {
    return ""
  }

}
