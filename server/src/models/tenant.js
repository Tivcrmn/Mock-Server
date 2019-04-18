import mongoose from "mongoose";
import Model from "./model";

const Schema = mongoose.Schema;

const TenantSchema = new Schema({
  name: { type: String },
  adminId: { type: String }, // 创建人默认为admin,拥有管理这个tenant的权限
  adminName: { type: String },
  avatar: { type: String, default: null },
  member: { type: Array, default: [] },
  disabled: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
});

TenantSchema.plugin(Model);
TenantSchema.index({ name: 1 }, { unique: true });
mongoose.model("Tenant", TenantSchema);
