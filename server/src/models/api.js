import mongoose from "mongoose";
import Model from "./model";

const Schema = mongoose.Schema;

const ApiSchema = new Schema({
  url: { type: String },
  system: { type: String },
  adminId: { type: String },
  method: { type: String },
  query: { type: Array, default: [] },
  fields: { type: Array, default: [] },
  version: { type: String, default: "v1" },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  repeat: { type: Number, default: 1 }
});

ApiSchema.plugin(Model);
ApiSchema.index({ url: 1 });
mongoose.model("Api", ApiSchema);
