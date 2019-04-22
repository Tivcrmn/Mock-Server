import { merge, omit } from "lodash";
import { Api } from "@/models";

export const save = (data) => {
  let api = new Api();
  api = merge(api, data);
  return new Promise((resolve, reject) => {
    api.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const getById = id => Api.findOne({ _id: id }).exec();

export const getByName = name => Api.findOne({ name: name }).exec();

export const getByQuery = (query, opt) => {
  return Api.find(query, "", opt).exec();
};

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id };
    Api.remove(query, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const update = (data) => {
  return new Promise((resolve, reject) => {
    let query = { _id: data._id };
    let updatedApi = omit(data, ["_id", "__v"]);
    updatedApi.updateTime = new Date();
    Api.update(query, updatedApi, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};
