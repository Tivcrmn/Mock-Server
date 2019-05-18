import apiResult from "@/common/result";
import { bhash, bcompare, generateToken } from "@/common/utils";
import { merge, assign } from "lodash";
import { User } from "@/methods";
import conext from "@/middlewares/conext";
import { getToken, setToken } from "@/common/token";

export const login = conext(async (req, res, next) => {
  let { userName, password } = req.body;
  let user = await User.getByUserName(userName);
  if (!user) {
    return res.send(apiResult({ error: "NO_SUCH_USER" }));
  }
  let compare = await bcompare(password, user.password);
  if (!compare) {
    return res.send(apiResult({ error: "WRONG_PASSWORD" }));
  }
  let token = await generateToken();
  let _user = assign({}, user._doc);
  delete _user.password;
  delete _user.token;
  let r = await setToken(token, _user);
  return res.send(apiResult(r ? { data: {
    user: _user,
    token: token
  } } : {
    error: "CREATE_TOKEN_FAIL"
  }));
});

export const create = conext(async (req, res, next) => {
  let { userName, password } = req.body;
  let user = await User.getByUserName(userName);
  if (user) {
    return res.send(apiResult({ error: "USER_EXISTS" }));
  }
  let passhash = await bhash(password);
  let newUser = await User.save(merge(req.body, { password: passhash }));
  return res.send(apiResult({ data: newUser }));
});

export const list = conext(async (req, res) => {
  let users = await User.getByQuery({});
  res.send(apiResult({ data: users }));
});

export const info = conext(async (req, res) => {
  let id = req.params.userId;
  let info = await User.getById(id);
  res.send(apiResult({ data: info }));
});

export const update = conext(async (req, res) => {
  let user = req.body;
  user._id = req.params.userId;
  if (user.password) {
    let passhash = await bhash(user.password);
    user.password = passhash;
  }
  let r = await User.update(user);
  res.send(r ? apiResult({ data: r }) : apiResult({ error: "UPDATE_FAILED" }));
});

export const del = conext(async (req, res) => {
  let id = req.params.userId;
  let r = await User.remove(id);
  res.send(r ? apiResult({ data: r }) : apiResult({ error: "DELETE_FAILED" }));
});

export const auth = conext(async (req, res) => {
  let r = await getToken(req.headers.authorization);
  res.send(apiResult(r ? { data: "token valid" } : { error: "token invalid" }));
});

export default {
  login,
  create,
  list,
  info,
  update,
  del,
  auth
};
