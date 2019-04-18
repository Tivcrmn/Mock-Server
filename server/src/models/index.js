import mongoose from "mongoose";
import config from "config";
import logger from "@/common/logger";
import bluebird from "bluebird";

// models
import "./user";
import "./tenant";
import "./bucket";
import "./api";

mongoose.Promise = bluebird;

const options = {
  useMongoClient: true,
  poolSize: 20
};
mongoose.connect(config.db, options)
  .then(res => mongoose.connection)
  .catch(err => {
    logger.error("connect to %s error: ", config.db, err.message);
    process.exit(1);
  });

export const User = mongoose.model("User");
export const Tenant = mongoose.model("Tenant");
export const Bucket = mongoose.model("Bucket");
export const Api = mongoose.model("Api");
