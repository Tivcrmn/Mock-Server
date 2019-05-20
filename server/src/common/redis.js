import config from "config";
import Redis from "ioredis";
import logger from "./logger";

const client = new Redis({ ...config.redis });

client.on("error", err => {
  if (err) {
    logger.error("connect to redis error, check your redis config", err);
    process.exit(1);
  }
});

export default client;
