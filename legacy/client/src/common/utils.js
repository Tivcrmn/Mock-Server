// utils
import {each, remove, isArray, isObject, get} from 'lodash'

let config = {}
try {
  if (process.env.NODE_ENV === 'development') {
    config = require('@/.config.json')
  }
} catch (e) {}

export const setClass = nkls => {
  let readyToSet = nkls
  let kls = document.body.getAttribute('class').split(' ')
  if (kls.length) {
    remove(kls, o => o === nkls)
    kls.push(nkls)
    readyToSet = kls.join(' ')
  }
  document.body.setAttribute('class', readyToSet)
}

export const delClass = nkls => {
  let readyToSet = nkls
  let kls = document.body.getAttribute('class').split(' ')
  if (kls.length) {
    remove(kls, o => o === nkls)
    readyToSet = kls.join(' ')
  }
  document.body.setAttribute('class', readyToSet)
}

// 把一个object数据清空
export const empty = obj => {
  let o = {}
  each(obj, (r, k) => {
    if (isObject(r)) {
      o[k] = isArray(r) ? [] : {}
    } else {
      if (r !== '') {
        o[k] = r
      }
    }
  })
  return o
}

// 把一个object数据结构深度清空
export const emptyDeep = obj => {
  let o = {}
  each(obj, (item, key) => {
    if (item !== null) {
      if (isArray(item)) {
        o[key] = item
      } else {
        if (isObject(item)) {
          o[key] = emptyDeep(item)
        } else {
          o[key] = item
        }
      }
    }
  })
  return o
}

// 手机打码
export const maskmobile = mobile => {
  if (!mobile) return
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 身份证打码
export const maskIdNumber = id => {
  return id.replace(/^(.{6})(.*)(.{4})$/, '$1********$3')
}

// 姓名打码
export const maskName = name => {
  if (name.length < 2) {
    return
  }
  let arr = name.split('')
  if (arr.length === 2) {
    return arr[0] + '*'
  } else {
    return arr[0] + '*' + (arr[arr.length - 1])
  }
}

// 验证中文
export const isCN = str => {
  if (!str) return
  return str.match(/^([\u4E00-\u9FA5]+，?)+$/) !== null
}

// 验证手机号
export const isMobile = mobile => {
  if (!mobile) return
  if (!('' + mobile).match(/^[1][3|5|7|8][0-9]{9}$/)) {
    return false
  }
  return true
}

// 验证身份证
export const isIdNumber = str => {
  if (!str) return
  return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(str)
}

// 验证邮件
export const isEmail = email => {
  return /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/.test(email)
}

// 阿拉伯数字转中文数字
export const num2str = num => {
  let map = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十'
  }
  return map[num.toString()]
}

// 处理图片返回地址
export const img = url => {
  let replace = '/'
  if (process.env.NODE_ENV === 'development') {
    let target = get(config, 'dev.proxyTable./api.target', null)
    if (target) {
      replace = target.replace('/api', '/')
    }
  }
  return url.replace('file/', replace)
}
