import log4js from "log4js";

const env = process.env.NODE_ENV || "development";

log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});

const logger = log4js.getLogger("cheese");
logger.level = env === "development" ? "DEBUG" : "ERROR";
// logger.setLevel(env === "development" ? "DEBUG" : "ERROR")

export default logger;
