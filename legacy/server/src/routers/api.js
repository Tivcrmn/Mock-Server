import apiResult from '@/common/result'
import {merge, assign} from 'lodash'
import {Api, Bucket} from '@/methods'
import conext from '@/middlewares/conext'

/**
 * api新建
 * @param {String} url api_url
 * @param {String} method api方法
 * @param {String} tenant api所属租户
 * @param {String} bucket api所属系统
 * @param {String} adminId api管理员
 * @param {String} repeat 重复对象条数
 * @param {String} fields 字段类型和名称
 * @param {String} query query字段类型和名称
 * @param {String} version api版本
 * res.locals.user.tenant
 * res.locals.user._id
 */

export const create = conext(async (req, res, next) => {
  let post = req.body
  if (res.locals.user) {
    post.tenant = res.locals.user.tenant
    post.adminId = res.locals.user._id
  } else {
    return res.send(apiResult({error: 'USER_INVALID'}))
  }
  let opts = {
    url: post.url,
    tenant: post.tenant,
    bucket: post.bucket,
    method: post.method
  }
  let promise = await Api.getByQuery(opts)
  if (promise.length) {
    return res.send(apiResult({error: 'API_EXISTS'}))
  }
  let r = await Api.save(post)
  if (r) {
    return res.send(apiResult({data: r}))
  }
})

/**
 * api列表查询
 * @param {String} bucket api所属系统
 * res.locals.user.tenant
 * res.locals.user.isAdmin
 */

export const list = conext(async (req, res) => {
  let opts = {
    tenant: res.locals.user.tenant,
    bucket: req.query.bucket
  }
  if (req.query.url) {
    opts.url = new RegExp(req.query.url)
  }
  if (res.locals.user.isAdmin) {
    opts.tenant = req.query.tenant
  }
  let apis = await Api.getByQuery(opts)
  res.send(apiResult({data: apis}))
})

/**
 * api删除
 * @param {String} id api_id
 * res.locals.user.isAdmin
 * res.locals.user.isTenantAdmin
 * res.locals.user._id
 */

export const deleteItem = conext (async (req, res) => {
  let id = req.body.id
  let api = await Api.getById(id)
  if (res.locals.user.isAdmin || res.locals.user.isTenantAdmin || res.locals.user._id === api.adminId) {
    let r = await Api.remove(id)
    if (r) {
      res.send(apiResult({data: r}))
    }
  } else {
    res.send(apiResult({error: 'INVALID'}))
  }
})

/**
 * 禁用api
 * @param {String} id api_id
 * res.locals.user.isAdmin
 * res.locals.user.isTenantAdmin
 * res.locals.user._id
 */

export const disable = conext (async (req, res) => {
  let id = req.body.id
  let api = await Api.getById(id)
  let bucket = await Bucket.getByName(api.bucket)
  if (res.locals.user.isAdmin || res.locals.user.isTenantAdmin || res.locals.user._id === api.adminId) {
    if (bucket.disabled && api.disabled) {
      return res.send({error: 'BUCKET_HAS_BEEN_DISABLED'})
    }
    let r = await Api.disable(id, api.disabled)
    if (r) {
      res.send(apiResult({data: r}))
    }
  } else {
    res.send(apiResult({error: 'INVALID'}))
  } 
})

/**
 * api详情
 * @param {String} id api_id 
 */

export const detail = conext(async (req, res) => {
  let details = await Api.getById(req.query.id)
  res.send(apiResult({data: details}))
})

/**
 * api详情修改
 * @param (同创建)
 */

export const detailSave = conext (async (req, res) => {
  let post = req.body
  let opts = {
    url: post.url,
    tenant: post.tenant,
    bucket: post.bucket,
    method: post.method
  }
  let promise = await Api.getByQuery(opts)
  if (promise.length && promise[0].url != post.url && promise[0].method != post.method) {
    return res.send(apiResult({error: 'API_EXISTS'}))
  }
  let r = await Api.update(post)
  if (r) {
    return res.send(apiResult({data: r}))
  }
})

export default {
  create,
  list,
  deleteItem,
  disable,
  detail,
  detailSave
}