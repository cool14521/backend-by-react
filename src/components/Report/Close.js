import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {
  Layout,
  Icon,
  Button,
  Table,
  DatePicker,
  Input
} from 'antd'
import OperationBar from '../../components/Layout/OperationBar.js'

const {Content} = Layout

const columns = [
  {
    title: 'ticket',
    dataIndex: 'ticket'
  }, {
    title: 'login',
    dataIndex: 'login'
  }, {
    title: '产品',
    dataIndex: 'symbol'
  }, {
    title: '类型',
    dataIndex: 'cmd',
    render: cmd => {
      if (cmd == 0) {
        return "买"
      }
      if (cmd == 1) {
        return "卖"
      }
      return text
    }
  }, {
    title: '开仓时间',
    dataIndex: 'open_time'
  }, {
    title: '开仓价格',
    dataIndex: 'open_price'
  }, {
    title: '平仓时间',
    dataIndex: 'close_time'
  }, {
    title: '平仓价格',
    dataIndex: 'close_price'
  }
]

@inject('appStore')@observer
class Close extends Component {
  constructor(props) {
    super(props);
  }
  //  componentDidMount() {}

  //  componentWillUnmount() {}

  render() {
    const {GetCloseReport, CloseReportObj} = this.props.appStore
    let info = CloseReportObj.rows.toJS()
    return (
      <Layout>
        <OperationBar>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="开始时间"/>
          <label>~</label>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间" onChange={(e, dataString) => {
            console.log(dataString)
          }}/>
          <label>昵称：</label>
          <Input placeholder="请输入昵称" style={{
            width: 200
          }}/>
          <Button type="primary" icon="search" onClick={GetCloseReport}>搜索</Button>
          <Button type="primary" icon="rollback">重置</Button>
          <Button type="primary" icon="reload">刷新</Button>
        </OperationBar>
        <Content>
          <Table columns={columns} dataSource={info} bordered/>
        </Content>
      </Layout>
    )
  }

}

export default Close
