import bcrypt from "bcryptjs";
import crypto from "crypto";

export const validateId = str => {
  return (/^[a-zA-Z0-9\\u4E00-\u9FA5\-._]+$/i).test(str);
};

export const bhash = (str, cb) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(str, 10, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const bcompare = (str, hash, cb) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const generateToken = (salt = 32) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(salt, function (err, buf) {
      err ? reject(err) : resolve(buf.toString("hex"));
    });
  });
};

export const md5 = string => {
  return crypto.createHash("md5").update(string).digest("hex");
};
