import apiResult from "@/common/result";
import { Tenant, User, Bucket, Api } from "@/methods";
import conext from "@/middlewares/conext";

/**
 * 租户新建
 * @param {String} name 租户名称
 * @param {String} adminName 管理员名称
 */
export const create = conext(async (req, res, next) => {
  let post = {
    name: req.body.name,
    adminName: req.body.adminName
  };
  // 校验租户
  let tenant = await Tenant.getByName(post.name);
  if (tenant) {
    return res.send(apiResult({ error: "TENANT_EXISTS" }));
  }
  // 校验管理员
  let user = await User.getByLoginName(post.adminName);
  if (user) {
    if ((user.isTenantAdmin && user.tenant) || user.tenant) {
      // 如果已经是管理员或者已经在其他租户中
      return res.send(apiResult({ error: "USER_INVALID" }));
    } else {
      // 如果不是
      await User.update(user, { tenant: post.name });
      post.adminId = user._id;
    }
  } else {
    return res.send(apiResult({ error: "USER_DONT_EXIST" }));
  }

  // 保存该租户
  let r = await Tenant.save(post);
  if (r) {
    return res.send(apiResult({ data: r }));
  }
  res.send(apiResult({ error: r }));
});

/**
 * 租户列表
 * @param {String} name 模糊查询租户名
 */
export const list = conext(async (req, res) => {
  let post = req.query;
  let opts = {};
  if (post.name) {
    opts.name = new RegExp(post.name);
  }
  let tenants = await Tenant.getByQuery(opts);
  res.send(apiResult({ data: tenants }));
});

/**
 * 租户详情
 * @param {String} id 租户id
 */

export const detail = conext(async (req, res) => {
  let details = await Tenant.getById(req.query.id);
  res.send(apiResult({ data: details }));
});

/**
 * 租户信息修改
 * @param {String} _id 租户id
 * @param {String} name 租户名称
 * @param {String} adminName 新管理员名
 * @param {String} adminId 旧管理员ID
 */

export const detailSave = conext(async (req, res) => {
  let post = {
    id: req.body._id,
    name: req.body.name,
    adminName: req.body.adminName,
    adminId: req.body.adminId
  };

  // 校验租户名字
  let oldTenant = await Tenant.getById(req.body._id);
  let newTenant = await Tenant.getByName(post.name);
  let change = false;
  if (!newTenant) {
    // 修改名称成功，相关成员也需修改租户名
    for (let i = 0; i < oldTenant.member.length; i++) {
      let user = await User.getByLoginName(oldTenant.member[i].loginName);
      await User.update(user, { tenant: post.name });
    }
    // 修改名称成功，相关系统也需修改租户名
    let buckets = Bucket.getByQuery({ tenant: oldTenant.name });
    for (let i = 0; i < buckets.length; i++) {
      await Bucket.update(buckets[i], { tenant: post.name });
    }
    // 修改名称成功，相关api也需修改租户名
    let apis = Api.getByQuery({ tenant: oldTenant.name });
    for (let i = 0; i < apis.length; i++) {
      await Api.update(apis[i], { tenant: post.name });
    }
    await Tenant.update({ _id: post.id, name: post.name });
    change = true;
  } else if (newTenant._id !== req.body._id) {
    // 新名称存在
    return res.send(apiResult({ error: "TENANT_EXISTS" }));
  } else {}

  // 校验管理员
  let user = await User.getByLoginName(post.adminName);
  if (!user || (!change && user.tenant !== oldTenant.name) || (change && user.tenant !== post.name)) {
    // 新管理员不存在或者该管理员不在该租户内
    return res.send(apiResult({ error: "USER_DONT_EXIST" }));
  } else if (oldTenant.adminName !== post.adminName) {
    // 修改管理员
    await User.update(user, { isTenantAdmin: true });
    await User.update({ _id: post.adminId }, { isTenantAdmin: false });
    let tenant = { _id: req.body._id, adminName: user.loginName, adminId: user._id };
    let c = await Tenant.update(tenant);
    res.send(apiResult({ data: c }));
  } else { res.send({ data: "success" }); }
});

/**
 * 删除租户
 * @param {String} id 租户id
 */

export const deleteItem = conext(async (req, res) => {
  let id = req.body.id;
  let tenant = await Tenant.getById(id);
  // 删除租户下的所有成员
  for (let i = 0; i < tenant.member.length; i++) {
    User.remove(tenant.member[i].id);
  }
  // 删除租户下所有的系统
  let buckets = await Bucket.getByQuery({ tenant: tenant.name });
  for (let i = 0; i < buckets.length; i++) {
    Bucket.remove(buckets[i]._id);
  }
  // 删除租户下所有的API
  let apis = await Api.getByQuery({ tenant: tenant.name });
  for (let i = 0; i < apis.length; i++) {
    Api.remove(apis[i]._id);
  }
  // 删除租户
  let r = await Tenant.remove(id);
  if (r) {
    res.send(apiResult({ data: r }));
  }
});

/**
 * 禁用租户
 * @param {String} _id 租户id
 * 租户改变状态之后，不论之前的下属用户，系统，API是什么状态，同一会与该租户状态相同
 */

export const disable = conext(async (req, res) => {
  let tenant = await Tenant.getById(req.body.id);
  // 改变下属成员
  for (let i = 0; i < tenant.member.length; i++) {
    let user = await User.getByLoginName(tenant.member[i].loginName);
    await User.disable(tenant.member[i].id, user.disabled);
  }

  // 改变下属系统
  let buckets = await Bucket.getByQuery({ tenant: tenant.name });
  for (let i = 0; i < buckets.length; i++) {
    await Bucket.disable(buckets[i]._id, buckets[i].disabled);
  }
  // 改变下属api
  let apis = await Api.getByQuery({ tenant: tenant.name });
  for (let i = 0; i < apis.length; i++) {
    await Api.disable(apis[i]._id, apis[i].disabled);
  }
  // 禁用租户
  let r = await Tenant.disable(req.body.id, tenant.disabled);
  if (r) {
    res.send(apiResult({ data: r }));
  }
});
export default {
  create,
  list,
  detail,
  detailSave,
  deleteItem,
  disable
};
