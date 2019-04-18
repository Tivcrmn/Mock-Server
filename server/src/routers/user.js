import apiResult from "@/common/result"
import {bhash, bcompare, generateToken} from "@/common/utils"
import _, {merge, assign} from "lodash"
import {User, Tenant} from "@/methods"
import conext from "@/middlewares/conext"
import {setToken} from "@/common/token"
import API500px from "500px"

const customerKey = "GmMX5wZjlfXcSOfbL0j28iLqTMJb90tjLJz3ykgJ"
let api500px = new API500px(customerKey)

/**
 * 注册
 * @param {String} loginName 用户名
 * @param {String} password 密码
 * @param {String} tenant 租户 （填入时为超级管理员建立普通用户，不填入时有两种情况：超级管理员建立管理员；管理员建立普通用户）
 * res.locals.user.isTenantAdmin
 */
export const register = conext (async (req, res, next) => {
  let post = req.body

  let opts = {}
  // 校验用户
  if (post.tenant || res.locals.user.isTenantAdmin) {
    if (res.locals.user.isTenantAdmin) {
      post.tenant = res.locals.user.tenant
    }
    // 校验租户
    let tenant = await Tenant.getByName(post.tenant)
    if (!tenant) {
      console.log("aaa", post.tenant)
      return res.send(apiResult({error: "TENANT_DONT_EXISTS"}))
    }
    // 校验是否已经有用户在所在租户中
    opts = {
      loginName: post.loginName,
      tenant: post.tenant
    }
    let user = await User.getByQuery(opts)
    if (user.length) {
      return res.send(apiResult({error: "USER_EXISTS"}))
    }
    // 生成密码
    let passhash = await bhash(post.password)
    // 保存用户信息
    let a = await User.save(merge(post, {password: passhash}))
    // 将用户加入进租户中
    tenant.member.push({id: a._id, loginName: a.loginName})
    tenant = {_id: tenant._id, member: tenant.member}
    let b = await Tenant.update(tenant)
    return res.send(apiResult({data: a}))
  } else {
    opts = {loginName: post.loginName}
    let user = await User.getByQuery(opts)
    if (user.length) {
      return res.send(apiResult({error: "USER_EXISTS"}))
    }
    // 生成密码
    let passhash = await bhash(post.password)
    // 保存用户信息
    let a = await User.save(merge(post, {password: passhash, isTenantAdmin: true}))
    return res.send(apiResult({data: a}))
  }
})

/**
 * 登录
 * @param {String} loginName 用户名
 * @param {String} password 密码
 */

export const login = conext(async (req, res, next) => {
  let post = req.body
  let user = await User.getByLoginName(post.loginName)
    .catch(err => res.send(apiResult({error: err})))
  if (!user) {
    return res.send(apiResult({error: "LOGIN_FAILED"}))
  }
  if (user.disabled) {
    return res.send(apiResult({error: "USER_HAS_BEEN_DISABLED"}))
  }
  console.log(post.password, user.password)
  let compare = await bcompare(post.password, user.password)
  if (!compare) {
    return res.send(apiResult({error: "WRONG_PASSWORD"}))
  }

  let token = await generateToken()
  let _user = assign({}, user._doc)
  delete _user.password
  delete _user.token

  let r = await setToken(token, _user)
  return res.send(apiResult(r ? {data: {
    user: _user,
    token: token
  }} : {
    error: "CREATE_TOKEN_FAIL"
  }))
})

/**
 * 用户列表查询
 * res.locals.user.tenant
 */

export const list = conext(async (req, res) => {
  let post = req.query
  let opts = {}
  if (res.locals.user.isTenantAdmin) {
    opts.tenant = res.locals.user.tenant
  }
  if (post.name) {
    opts.loginName = new RegExp(post.name)
  }
  let users = await User.getByQuery(opts)
  res.send(apiResult({data: users}))
})

/**
 * 头像
 */

export const avatar = conext(async (req, res) => {
  api500px.photos.getPopular({
    feature: "popular",
    // exclude: "8",
    // only: "City and Architecture,Travel,Nature", // Travel/Nature/Landscapes/Street/City and Architecture
    image_size: "440, 1080, 2048",
    sort: "created_at",
    rpp: "200"
  }, function (error, results) {
    if (error) {
      console.log("err:", error)
      return;
    }
    res.send(results)
  });
})

/**
 * 详情
 * @param {String} id 用户id
 */

export const detail = conext(async (req, res) => {
  let details = await User.getById(req.query.id)
  res.send(apiResult({data: details}))
})

/**
 * 用户详情修改
 * @param {String} _id 用户id
 * @param {String} loginName 用户名
 * @param {String} password 密码
 */

export const detailSave = conext (async (req, res) => {
  let post = req.body
  let opts = {"loginName": post.loginName}
  let oldUser = await User.getById(post._id)
  let newUser = await User.getByQuery(opts)

  // 校验用户
  if (newUser.length && newUser[0]._id.toString() != oldUser._id.toString()) {
    return res.send(apiResult({error: "USER_EXISTS"}))
  } else {
    let a = await User.update(post, {loginName: post.loginName})
  }



  // 保存用户信息
  if (post.password) {
    let passhash = await bhash(post.password)
    let a = await User.update(post, {loginName: post.loginName, password: passhash})
  } else {
    let a = await User.update(post, {loginName: post.loginName})
  }
  // 保存租户信息
  let tenant = await Tenant.getByName(post.tenant)
  let aaa = tenant.member.find((item) => {return item.loginName === oldUser.loginName})
  aaa.loginName = post.loginName
  tenant = {_id: tenant._id, member: tenant.member}
  let b = await Tenant.update(tenant)
  return res.send(apiResult({data: b}))
})

/**
 * 用户删除
 * @param {String} id 用户id
 */

export const deleteItem = conext (async (req, res) => {
  let id = req.body.id
  let user = await User.getById(id)
  let tenant = await Tenant.getByName(user.tenant)
  // 删除用户所在租户中的信息
  if (tenant) {
    let newMember = _.remove(tenant.member, (item) => {
      return item.id != id
    })
    tenant = {_id: tenant._id, member: newMember}
    let a = await Tenant.update(tenant)
  }


  let r = await User.remove(id)
  if (r) {
    res.send(apiResult({data: r}))
  }
})

/**
 * 禁用用户
 * @param {String} id 用户id
 */

export const disable = conext (async (req, res) => {
  let user = await User.getById(req.body.id)
  let tenant = await Tenant.getByName(user.tenant)
  if (tenant.disabled && user.disabled) {
    return res.send(apiResult({error: "TENANT_HAS_BEEN_DISABLED"}))
  }
  let r = await User.disable(req.body.id, user.disabled)
  if (r) {
    return res.send(apiResult({data: r}))
  }
})

export default {
  register,
  login,
  list,
  avatar,
  detail,
  detailSave,
  deleteItem,
  disable,
  register
}
