import uuid from "node-uuid"
import config from "config"
import _, {isFunction} from "lodash"
import {Api} from "@/models"
import conext from "@/middlewares/conext"


export const save = (data) => {
  let api = new Api()
  api.url = data.url
  api.method = data.method
  api.tenant = data.tenant
  api.bucket = data.bucket
  api.adminId = data.adminId
  api.repeat = data.repeat
  api.fields = data.fields
  api.query = data.query
  api.version = data.version
  return new Promise((resolve, reject) => {
    api.save((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

/**
 * get by id
 * @param {String} id
 * @param {Function} callback
 */
export const getById = id => Api.findOne({_id: id}).exec()

export const getByName = name => Api.findOne({url: url}).exec()

/**
 * 获取所有符合条件的数据
 */
export const getByQuery = (query, opt) => {
  if (isFunction(opt)) {
    callback = opt
    opt = {}
  }
  return Api.find(query, "", opt).exec()
}

export const remove = (id) => {
  return new Promise ((resolve, reject) => {
    let query = {_id: id}
    Api.remove(query, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

export const disable = (id, disabled) => {
  return new Promise ((resolve, reject) => {
    let query = {_id: id}
    Api.update(query, {disabled: !disabled}, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}


export const update = (data) => {
  return new Promise ((resolve, reject) => {
    let query = {_id: data._id}
    let a = _.omit(data, ["_id", "__v"])
    a.updateTime = new Date()
    Api.update(query, a, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}