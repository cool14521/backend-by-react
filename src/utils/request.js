import fetch from 'isomorphic-fetch'
import { API_PATH } from '../utils'
import FormData from 'form-data'

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  let error = new Error()
  error.name = response.status
  error.message = response.statusText
  error.response = response
  throw error
}

function checkApiStatus(response) {

  if (response.errorcode == 0) return response
  let error = new Error()
  error.name = response.errorcode
  error.message = response.errormsg
  error.response = response
  throw error
}

function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {

      let e = new Error()
      e.name = -1
      e.message = "Connection timeout, please check your internet connection and try again"

      reject(e)

    }, ms)
    promise.then(resolve, reject)
  })
}

export default async function request(url, options) {

  options = process.env.NODE_ENV === 'development' ? options : { ...options, credentials: 'include' }

  const response = await timeout(10000, fetch(`${API_PATH}${url}`, options))

  checkStatus(response)

  const data = await response.json()

  checkApiStatus(data)

  return data
}

export function objectToFormData(item) {

  let form_data = new FormData()

  for (var key in item) {
    form_data.append(key, item[key])
  }

  return form_data

}
