import request from '../utils/request'

export const getCloseReport = values => {
  return request.get('/api/v1/report/close', values)
}
