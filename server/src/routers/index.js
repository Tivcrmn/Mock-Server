import { Router } from "express";
import apiResult from "@/common/result";
import user from "./user";
import system from "./system";
import api from "./api";
import { LOGIN } from "@/middlewares/auth";

const router = Router();

router.all("*", (req, res, next) => {
  console.log("pass-api-self:", req.url);
  next();
});

router.get("/ping", (req, res) => {
  res.send(apiResult({
    source: "api-self-server",
    params: req.params,
    method: req.method,
    url: req.url
  }));
});

// user
router.post("/login", user.login);
router.post("/register", user.create);
router.get("/user", LOGIN, user.list);
router.get("/user/:userId", LOGIN, user.info);
router.put("/user/:userId", LOGIN, user.update);
router.delete("/user/:userId", LOGIN, user.del);

// system
router.get("/system", LOGIN, system.list);
router.get("/system/:systemId", LOGIN, system.info);
router.post("/system/:systemId", LOGIN, system.create);
router.put("/system/:systemId", LOGIN, system.update);
router.delete("/system/:systemId", LOGIN, system.del);

// api
router.get("/system/:systemId/api", LOGIN, api.list);
router.get("/system/:systemId/api/:apiId", LOGIN, api.info);
router.post("/system/:systemId/api/:apiId", LOGIN, api.create);
router.put("/system/:systemId/api/:apiId", LOGIN, api.update);
router.delete("/system/:systemId/api/:apiId", LOGIN, api.del);

export default router;
