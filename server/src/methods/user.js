import uuid from 'node-uuid'
import config from 'config'
import _, {isFunction} from 'lodash'
import {User} from '@/models'

/**
 * 保存user
 * Callback
 * - err
 * - user
 * @param {String} loginName 用户名
 * @param {String} password 激活码
 * @param {String} email 邮箱
 * @param {Function} callback 回调函数
 */
export const save = ({
  loginName = '',
  password = '',
  tenant = '',
  isTenantAdmin = false
} = {}) => {
  let user = new User()
  user.loginName = loginName
  user.password = password
  user.tenant = tenant
  user.isTenantAdmin = isTenantAdmin
  // user.token = uuid.v4()

  return new Promise((resolve, reject) => {
    user.save((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

/**
 * get by user id
 * Callback
 * - err,
 * - user, 用户
 * @param {String} id
 * @param {Function} callback
 */
export const getById = (id, callback) => User.findOne({_id: id}, callback)

export const getByLoginName = (loginName) => User.findOne({loginName: loginName}).exec()

/**
 * 获取所有符合条件的用户
 */
export const getByQuery = (query = {}, opt) => {
  if (isFunction(opt)) {
    callback = opt
    opt = {}
  }
  return User.find(query, '', opt).exec()
}

export const update = (data, ex = {}) => {
  return new Promise ((resolve, reject) => {
    let query = {_id: data._id}
    let a = _.omit(data, ['_id', '__v'])
    if (ex) {
      a = ex
    }
    a.updateTime = new Date()
    User.update(query, a, (err, res) => {
      err ? reject(err) : resolve(res)  
    })
  })
}

export const remove = (id) => {
  return new Promise ((resolve, reject) => {
    let query = {_id: id}
    User.remove(query, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

export const disable = (id, disabled) => {
  return new Promise ((resolve, reject) => {
    let query = {_id: id}
    User.update(query, {disabled: !disabled}, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}