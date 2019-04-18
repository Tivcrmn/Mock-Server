// runtime info
import mongoose from "mongoose"
import config from "config"
import logger from "@/common/logger"

const isProduction = process.env.NODE_ENV === "production"

// mongo log
const traceMQuery = (method, info, query) => {
  return (err, result, millis) => {
    if (err) {
      logger.error("trace error:", err)
    }
    var infos = []
    infos.push(`${query._collection.collection.name}.${method.blue}`)
    infos.push(JSON.stringify(info))
    infos.push((`${millis}ms`).green)
    logger.debug("MONGO".magenta, infos.join(" "))
  }
}

!isProduction && mongoose
  .Mongoose
  .prototype
  .mquery
  .setGlobalTraceFunction(traceMQuery)

// request log
export default (req, res, next) => {
  if (isProduction) {
    logger.info("\n\nRequest", t.toISOString(), req.method, req.url, req.ip)
  } else {
    if (/\/api\//.test(req.url)) {
      console.log("Request: ".green, req.method.magenta, req.url.cyan)
    }
    if (/\/api-self\//.test(req.url)) {
      console.log("Request: ".green, req.method.magenta, req.url.cyan)
    }
  }
  next()
}
