import _, { isFunction } from "lodash";
import { Tenant } from "@/models";

/**
 * save tenant
 * Callback
 * - err
 * - tenant
 * @param {String} name 租户名称
 * @param {String} adminId 创建人ID
 * @param {String} adminName 创建人姓名
 * @param {String} member 租户所属成员（默认创建者在其中）
 * @param {Function} callback 回调
 */
export const save = (data) => {
  let tenant = new Tenant();
  tenant.name = data.name;
  tenant.adminId = data.adminId;
  tenant.adminName = data.adminName;
  tenant.member.push({ loginName: data.adminName, id: data.adminId });
  return new Promise((resolve, reject) => {
    tenant.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

/**
 * get by user id
 * @param {String} id
 * @param {Function} callback
 */
export const getById = id => Tenant.findOne({ _id: id }).exec();

export const getByName = name => Tenant.findOne({ name: name }).exec();

/**
 * 获取所有符合条件的数据
 */
export const getByQuery = (query, opt) => {
  if (isFunction(opt)) {
    opt = {};
  }
  return Tenant.find(query, "", opt).exec();
};
/**
 * update
 * 传入的data中包含所有信息
 */
export const update = (data) => {
  return new Promise((resolve, reject) => {
    let query = { _id: data._id };
    let a = _.omit(data, ["_id", "__v"]);
    a.updateTime = new Date();
    Tenant.update(query, a, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

/**
 * remove
 * @param {String} id
 */
export const remove = (id) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id };
    Tenant.remove(query, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

/**
 * disable
 */

export const disable = (id, disabled) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id };
    Tenant.update(query, { disabled: !disabled }, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};
