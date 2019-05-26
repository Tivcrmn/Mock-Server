import apiResult from "@/common/result";
import { Api } from "@/methods";
import conext from "@/middlewares/conext";

export const list = conext(async (req, res) => {
  let apis = await Api.getByQuery({ systemId: req.params.systemId });
  res.send(apiResult({ data: apis }));
});

export const info = conext(async (req, res) => {
  let id = req.params.apiId;
  let info = await Api.getById(id);
  res.send(apiResult({ data: info }));
});

export const create = conext(async (req, res, next) => {
  let api = await Api.getByName(req.body.url);
  if (api) {
    return res.send(apiResult({ error: "API_EXISTS" }));
  }
  let newApi = await Api.save(req.body);
  return res.send(apiResult({ data: newApi }));
});

export const update = conext(async (req, res) => {
  let api = req.body;
  api._id = req.params.apiId;
  let r = await Api.update(api);
  res.send(r ? apiResult({ data: r }) : apiResult({ error: "UPDATE_FAILED" }));
});

export const del = conext(async (req, res) => {
  let id = req.params.apiId;
  let r = await Api.remove(id);
  res.send(r ? apiResult({ data: r }) : apiResult({ error: "DELETE_FAILED" }));
});

export default {
  list,
  info,
  create,
  update,
  del,
};
