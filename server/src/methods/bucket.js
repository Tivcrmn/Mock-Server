import { isFunction } from "lodash";
import { Bucket } from "@/models";

/**
 * save tenant
 * Callback
 * - err
 * - tenant
 * @param {String} name 租户名称
 * @param {String} adminId 创建人ID
 * @param {Function} callback 回调
 */
export const save = (data) => {
  let bucket = new Bucket();
  bucket.name = data.name;
  bucket.tenant = data.tenant;
  bucket.adminId = data.adminId;

  return new Promise((resolve, reject) => {
    bucket.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

/**
 * get by id
 * @param {String} id
 * @param {Function} callback
 */
export const getById = id => Bucket.findOne({ _id: id }).exec();

export const getByName = name => Bucket.findOne({ name: name }).exec();

/**
 * 获取所有符合条件的数据
 */
export const getByQuery = (query, opt) => {
  if (isFunction(opt)) {
    opt = {};
  }
  return Bucket.find(query, "", opt).exec();
};

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id };
    Bucket.remove(query, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const disable = (id, disabled) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id };
    Bucket.update(query, { disabled: !disabled }, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};
