import apiResult from "@/common/result";
import { System } from "@/methods";
import conext from "@/middlewares/conext";

export const list = conext(async (req, res) => {
  let systems = await System.getByQuery({});
  res.send(apiResult({ data: systems }));
});

export const info = conext(async (req, res) => {
  let id = req.params.systemId;
  let info = await System.getById(id);
  res.send(apiResult({ data: info }));
});

export const create = conext(async (req, res, next) => {
  let system = await System.getByName(req.body.systemName);
  if (system) {
    return res.send(apiResult({ error: "SYSTEM_EXISTS" }));
  }
  let newSystem = await System.save(req.body);
  return res.send(apiResult({ data: newSystem }));
});

export const update = conext(async (req, res) => {
  let system = req.body;
  system._id = req.params.systemId;
  let r = await System.update(system);
  res.send(r ? apiResult({ data: r }) : apiResult({ error: "UPDATE_FAILED" }));
});

export const del = conext(async (req, res) => {
  let id = req.params.systemId;
  let r = await System.remove(id);
  res.send(r ? apiResult({ data: r }) : apiResult({ error: "DELETE_FAILED" }));
});

export default {
  list,
  info,
  create,
  update,
  del
};
