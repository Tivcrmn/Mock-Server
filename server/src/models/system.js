import mongoose from "mongoose";
import Model from "./model";

const Schema = mongoose.Schema;

const SystemSchema = new Schema({
  systemName: { type: String },
  adminId: { type: String },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
});

SystemSchema.plugin(Model);
SystemSchema.index({ systemName: 1 }, { unique: true });
mongoose.model("System", SystemSchema);
