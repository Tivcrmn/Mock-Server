import {Message} from 'element-ui'

const CODE = {
  401: '请求未授权，需要身份认证',
  403: '请求被服务器拒绝，请确认自己是否有权限',
  404: '请求地址错误 code: 404',
  504: 'API网关没有响应'
}

// response error handle
export const RESPONSE_CATCH = err => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('%cNB-LOGGER HTTP-ERR', 'background:#c43;color:#fff;padding:0 3px', err)
    }
    Message.error(CODE[err.status] || err.statusText || err)
  } catch (e) {
    Message.error(e)
  }
}
