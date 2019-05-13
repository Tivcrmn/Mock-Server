import config from "config";
import { get } from "lodash";
import apiResult from "@/common/result";
import { getToken } from "@/common/token";
import conext from "@/middlewares/conext";

export const loginRequired = async (req, res) => {
  // 先获取authorization，如果不存在继续查找query token，最后查找cookie token
  let bearer = req.headers["authorization"];
  let queryToken = req.query["access_token"];
  let cookieToken = null;
  let bearerToken = queryToken || cookieToken
    ? queryToken || cookieToken
    : bearer && bearer !== "Bearer" ? bearer.replace("Bearer ", "") : null;

  if (!bearerToken) {
    return false;
  }

  // 根据token去redis获取user信息
  let user = await getToken(bearerToken);
  res.locals.user = user;
  res.locals.access_token = bearerToken;

  return user !== null;
};

// 登录权限
export const LOGIN = conext(async (req, res, next) => {
  let premission = await loginRequired(req, res);
  if (!premission) {
    return res.send(apiResult({
      error: "ACCESS_DENIED"
    }));
  }
  next();
});

// 自有资源权限
export const OWNER = conext(async (req, res, next) => {
  let premission = await loginRequired(req, res);
  if (!premission) {
    return res.send(apiResult({
      error: "ACCESS_DENIED"
    }));
  }

  let userId = req.params["userId"] || req.query["userId"] || get(req, "body.userId", null);
  if (!userId) {
    return res.send(apiResult({
      error: "ACCESS_DENIED",
      message: "path, query or body params userId required"
    }));
  }
  if (userId !== res.locals.user._id) {
    return res.send(apiResult({
      error: "ACCESS_DENIED",
      message: "owner resource"
    }));
  }

  next();
});

// 管理员权限
export const ADMIN = conext(async (req, res, next) => {
  let premission = await loginRequired(req, res);
  if (!premission) {
    return res.send(apiResult({
      error: "ACCESS_DENIED"
    }));
  }

  let user = res.locals.user;
  if (!user.isAdmin) {
    return res.send(apiResult({
      error: "ADMIN_ACCESS_DENIED",
      message: "you are not administrator"
    }));
  }

  next();
});
