import config from "config";
import db from "@/common/redis";

export const set = obj => {
  return new Promise((resolve, reject) => {
    if (typeof (b) !== "string") {
      obj = JSON.stringify(obj);
    }
    db.set(obj, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const get = key => {
  return new Promise((resolve, reject) => {
    db.get(key, (err, res) => {
      if (err) {
        return reject(err);
      }
      let data = null;
      try {
        data = JSON.parse(res);
      } catch (e) {
        data = res;
      }
      resolve(data);
    });
  });
};

export const setToken = (token, obj) => {
  return new Promise((resolve, reject) => {
    db.setex(
      `${config.tokenName}:${token}`,
      config.tokenExpireSeconds,
      JSON.stringify(obj),
      (err, res) => {
        err ? reject(res) : resolve(res === "OK");
      });
  });
};

export const getToken = token => {
  return new Promise((resolve, reject) => {
    db.get(`${config.tokenName}:${token}`, (err, res) => {
      if (err) {
        return reject(err);
      }
      let data = null;
      try {
        data = JSON.parse(res);
      } catch (e) {
        data = res;
      }
      resolve(data);
    });
  });
};
