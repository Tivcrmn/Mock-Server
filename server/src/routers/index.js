import { Router } from "express";
import user from "./user";
import system from "./system";
import api from "./api";

const router = Router();

router.all("*", (req, res, next) => {
  console.log("pass-api-self:", req.url);
  next();
});

// user
router.post("/login", user.login);
router.post("/register", user.create);
router.post("/auth", user.auth);
router.get("/user", user.list);
router.get("/user/:userId", user.info);
router.put("/user/:userId", user.update);
router.delete("/user/:userId", user.del);

// system
router.get("/system", system.list);
router.get("/system/:systemId", system.info);
router.post("/system", system.create);
router.put("/system/:systemId", system.update);
router.delete("/system/:systemId", system.del);

// api
router.get("/system/:systemId/api", api.list);
router.get("/system/:systemId/api/:apiId", api.info);
router.post("/system/:systemId/api", api.create);
router.put("/system/:systemId/api/:apiId", api.update);
router.delete("/system/:systemId/api/:apiId", api.del);

export default router;
