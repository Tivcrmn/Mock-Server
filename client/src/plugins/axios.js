import axios from "axios";

const async = ({ dispatch, url, method, data, headers, success, fail }) => {
  let reqObj = {};
  if (method) {
    reqObj = {
      method,
      url,
      data,
      baseURL: "http://127.0.0.1:5000/",
      headers: { ...headers, "Content-Type": "application/json" },
    };
  }
  axios(reqObj).then(res => {
    const r = res.data;
    if (r.success) {
      success && success(r);
    } else {
      fail && fail(r);
    }
  }).catch(() => {
  });
};

export default async;
