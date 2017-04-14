/**
 * 获取url参数
 * @param {String} url url地址
 * @param {String} name 参数名称
 */
export const getQueryString = (url, name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  const r = url.slice(url.search(/\?/)).substr(1).match(reg)
  if (r != null) { return unescape(r[2]) }
  return null
}

/**
 * 函数去抖,针对winodw.onresize等事件
 * @param {Function} method 需要去抖的方法
 */
export const debounce = method => {
  if (method.timeout) clearTimeout(method.timeout)
  method.timeout = setTimeout(() => {
    method()
  }, 500)
}

/**
 * 识别是否为微信浏览器
 */
export const isWeixinBrowser = () => /micromessenger/.test(navigator.userAgent.toLowerCase())
