import mongoose from "mongoose";
import Model from "./model";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
});

UserSchema.plugin(Model);
UserSchema.index({ userName: 1 }, { unique: true });
mongoose.model("User", UserSchema);
