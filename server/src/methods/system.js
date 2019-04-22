import { merge, omit } from "lodash";
import { System } from "@/models";

export const save = (data) => {
  let system = new System();
  system = merge(system, data);
  return new Promise((resolve, reject) => {
    system.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const getById = id => System.findOne({ _id: id }).exec();

export const getByName = systemName => System.findOne({ systemName }).exec();

export const getByQuery = (query, opt) => {
  return System.find(query, "", opt).exec();
};

export const update = system => {
  return new Promise((resolve, reject) => {
    let query = { _id: system._id };
    let data = omit(system, ["_id", "__v"]);
    data.updateTime = new Date();
    System.update(query, data, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id };
    System.remove(query, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};
