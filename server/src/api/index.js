import { Router } from "express";
import apiResult from "@/common/result";
import apiDatas from "@/api/apiDatas";
import conext from "@/middlewares/conext";
import { Api } from "@/methods";

const router = Router();

const error = (res, code = 404, data = { error: "NOT_FOUND" }) => {
  res.status(code).send(apiResult(data));
};

router.all("/api/:system/:version/*", conext(async (req, res) => {
  let opts = {
    bucket: req.params.bucket,
    version: req.params.version,
    url: req.params[0],
    method: req.method
  };
  let apiRes = await Api.getByQuery(opts);
  if (!apiRes.length) {
    return error(res);
  }
  let fields = apiRes[0].fields;
  res.send(apiDatas({ fields: fields, repeat: apiRes[0].repeat }));
}));

export default router;
