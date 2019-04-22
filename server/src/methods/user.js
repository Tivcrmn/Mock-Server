import { omit, merge } from "lodash";
import { User } from "@/models";

export const save = newUser => {
  let user = new User();
  user = merge(user, newUser);
  return new Promise((resolve, reject) => {
    user.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const getById = (id, callback) => User.findOne({ _id: id }, callback);

export const getByUserName = (userName) => User.findOne({ userName }).exec();

export const getByQuery = (query = {}, opt) => {
  return User.find(query, "", opt).exec();
};

export const update = user => {
  return new Promise((resolve, reject) => {
    let query = { _id: user._id };
    let data = omit(user, ["_id", "__v"]);
    data.updateTime = new Date();
    User.update(query, data, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id };
    User.remove(query, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};
