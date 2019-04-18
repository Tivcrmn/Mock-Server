import mongoose from "mongoose";
import Model from "./model";

const Schema = mongoose.Schema;

/**
 * 某租户下一般会有多个系统，每个系统可能都会用到mock server的数据
 * bucket就是对应租户下面的各个系统，每个系统(或者叫数据源)对应一个bucket
 * 实际上就是针对某个系统数据源的api集合
 */
const BucketSchema = new Schema({
  name: { type: String },
  tenant: { type: String }, // 所属tenant
  adminId: { type: String }, // 创建人
  avatar: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
});

BucketSchema.plugin(Model);
BucketSchema.index({ name: 1 });
mongoose.model("Bucket", BucketSchema);
