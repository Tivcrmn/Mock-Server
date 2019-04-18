import mongoose from "mongoose";
import Model from "./model";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  loginName: { type: String },
  password: { type: String },
  email: { type: String, default: null },
  signature: { type: String, default: null },
  profile: { type: String, default: null },
  avatar: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isTenantAdmin: { type: Boolean, default: false },
  tenant: { type: String, default: null },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  token: { type: String, default: null }
});

UserSchema.plugin(Model);
UserSchema.index({ loginName: 1 }, { unique: true });
mongoose.model("User", UserSchema);
