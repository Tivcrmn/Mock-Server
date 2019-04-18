import apiResult from '@/common/result'
import {merge, assign} from 'lodash'
import {Bucket, Api, Tenant} from '@/methods'
import conext from '@/middlewares/conext'

/**
 * 系统新建
 * @param {String} name 系统名称
 * res.locals.user.tenant
 * res.locals.user._id
 */

export const create = conext(async (req, res, next) => {
  if (res.locals.user.isAdmin) {
    let tenant = await Tenant.getByName(req.body.tenant)
    if (!tenant) {
      return res.send(apiResult({error: 'TENANT_DONT_EXISTS'}))
    }
  }
  let post = {
    name: req.body.name,
    tenant: res.locals.user.isAdmin ? req.body.tenant : res.locals.user.tenant,
    adminId: res.locals.user._id
  }
  let opts = {
    name: post.name,
    tenant: post.tenant
  }
  let promise = await Bucket.getByQuery(opts)
  if (promise.length) {
    return res.send(apiResult({error: 'BUCKET_EXISTS'}))
  }
  let r = await Bucket.save(post)
  if (r) {
    return res.send(apiResult({data: r}))
  }
})

/**
 * 系统列表查询
 * res.locals.user.tenant
 * res.locals.user.isAdmin
 */

export const list = conext(async (req, res) => {
  let post = req.query
  let opts = {
    tenant: res.locals.user.tenant
  }
  if (res.locals.user.isAdmin) {
    opts = {}
  }
  if (post.name) {
    opts.name = new RegExp(post.name)
  }
  let buckets = await Bucket.getByQuery(opts)
  res.send(apiResult({data: buckets}))
})

/**
 * 系统删除
 * @param {String} id 系统id
 * res.locals.user.isAdmin
 * res.locals.user.isTenantAdmin
 * res.locals.user._id
 */

export const deleteItem = conext (async (req, res) => {
  let id = req.body.id
  let bucket = await Bucket.getById(id)
  if (res.locals.user.isAdmin || res.locals.user.isTenantAdmin || bucket.adminId === res.locals.user._id) {
    // 可删除
    let apis = await Api.getByQuery({tenant: bucket.tenant, bucket: bucket.name})
    for (let i = 0; i < apis.length; i++) {
      let a = apis[i].remove(apis[i]._id)
    }
    let r = await Bucket.remove(id)
    if (r) {
      res.send(apiResult({data: r}))
    }
  } else {
    res.send(apiResult({error: 'INVALID'}))
  }
})

/**
 * 禁用系统
 * @param {String} id 系统id
 */

export const disable = conext (async (req, res) => {
  let bucket = await Bucket.getById(req.body.id)
  let tenant = await Tenant.getByName(bucket.tenant)
  if (tenant.disabled && bucket.disabled) {
    return res.send({error: 'TEANAT_HAS_BEEN_DISABLED'})
  }
  // 禁用api
  let apis = await Api.getByQuery({bucket: bucket.name})
  for (let i = 0; i < apis.length; i++) {
    let a = await Api.disable(apis[i]._id, apis[i].disabled)
  }
  // 禁用系统
  let r = await Bucket.disable(req.body.id, bucket.disabled)
  if (r) {
    return res.send(apiResult({data: r}))
  } 
})

export default {
  create,
  list,
  deleteItem,
  disable
}
