import config from "config";
import Redis from "ioredis";
import logger from "./logger";

const client = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  db: config.redis.db
});

client.on("error", err => {
  if (err) {
    logger.error("connect to redis error, check your redis config", err);
    process.exit(1);
  }
});

export default client;
