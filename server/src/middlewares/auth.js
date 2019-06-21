import apiResult from "@/common/result";
import { getToken } from "@/common/token";
import conext from "@/middlewares/conext";

export const loginRequired = async (req, res) => {
  let token = req.headers["authorization"];
  // get the user info from the redis
  let user = await getToken(token);
  res.locals.user = user;
  res.locals.access_token = token;
  return user !== null;
};

export const LOGIN = conext(async (req, res, next) => {
  let premission = await loginRequired(req, res);
  if (!premission) {
    return res.send(apiResult({
      error: "ACCESS_DENIED",
    }));
  }
  next();
});
