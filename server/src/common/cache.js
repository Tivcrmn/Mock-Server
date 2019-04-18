import redis from "./redis";
import logger from "./logger";
import { noop } from "lodash";

export const get = (key, callback) => {
  redis.get(key, (err, data) => {
    if (err) {
      return callback(err);
    }
    if (!data) {
      return callback();
    }

    try {
      data = JSON.parse(data);
    } catch (e) {}

    const duration = new Date();
    logger.debug("Cache", "get", key, (duration + "ms").green);
    callback(null, data);
  });
};

// time 参数可选，秒为单位
export const set = (key, value, time, callback) => {
  if (typeof time === "function") {
    callback = time;
    time = null;
  }
  callback = callback || noop;
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }

  if (!time) {
    redis.set(key, value, callback);
  } else {
    redis.setex(key, time, value, callback);
  }
  const duration = new Date();
  logger.debug("Cache", "set", key, (duration + "ms").green);
};
