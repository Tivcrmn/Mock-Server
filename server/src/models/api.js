import mongoose from "mongoose"
import Model from "./model"

const Schema = mongoose.Schema

const ApiSchema = new Schema({
  url: {type: String}, // API地址
  tenant: {type: String}, // 所属tenant
  bucket: {type: String}, // 所属bucket
  adminId: {type: String}, // 操作人
  method: {type: String}, // api方法
  query: {type: Array, default: []}, // query参数
  fields: {type: Array, default: []}, // 返回的字段
  apiResult: {type: Object, default: {}}, // 返回的数据结构warpper
  version: {type: String, default: "v1"}, // api version(v1/v2/v3...)
  // permission: {type: String, default: null},  API权限
  disabled: {type: Boolean, default: false},
  createTime: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now},
  repeat: {type: Number, default: 1}
})

ApiSchema.plugin(Model)
ApiSchema.index({url: 1}, {unique: true })
mongoose.model("Api", ApiSchema)
