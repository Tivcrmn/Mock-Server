import { Router } from "express";
import apiResult from "@/common/result";
import user from "./user";
import tenant from "./tenant";
import bucket from "./bucket";
import api from "./api";
import { LOGIN, ADMIN, TENANTADMIN } from "@/middlewares/auth";

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

// 用NodeJs开发，带管理后台，实现在管理后台中可以添加定制API，
// 设置api地址，以及api的返回字段，同时要能提供多个不同系统的mock数据支持（租户概念tenants）

// 用户
router.post("/login", user.login);

router.post("/register", TENANTADMIN, user.register);
router.get("/user/list", TENANTADMIN, user.list);
router.get("/user/detail", LOGIN, user.detail);
router.post("/user/detail", TENANTADMIN, user.detailSave);
router.delete("/user/detail", TENANTADMIN, user.deleteItem);
router.post("/user/power", TENANTADMIN, user.disable);

// 租户
router.post("/tenant/create", ADMIN, tenant.create);
router.get("/tenant/list", ADMIN, tenant.list);
router.get("/tenant/detail", ADMIN, tenant.detail);
router.post("/tenant/detail", ADMIN, tenant.detailSave);
router.delete("/tenant/detail", ADMIN, tenant.deleteItem);
router.post("/tenant/power", ADMIN, tenant.disable);

// 系统
router.post("/bucket/create", LOGIN, bucket.create);
router.get("/bucket/list", LOGIN, bucket.list);
router.delete("/bucket/detail", LOGIN, bucket.deleteItem);
router.post("/bucket/power", LOGIN, bucket.disable);

// API
router.post("/api/create", LOGIN, api.create);
router.get("/api/list", LOGIN, api.list);
router.get("/api/detail", LOGIN, api.detail);
router.post("/api/detail", LOGIN, api.detailSave);
router.delete("/api/detail", LOGIN, api.deleteItem);
router.post("/api/power", LOGIN, api.disable);

export default router;
