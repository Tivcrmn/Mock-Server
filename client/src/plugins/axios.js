import axios from "axios";

const axiosWrapper = ({ dispatch, url, method, data, headers, success, fail }) => {
  let reqObj = {};
  if (method) {
    reqObj = {
      method,
      url,
      data,
      baseURL: "http://127.0.0.1:5000/",
      headers: { ...headers, "Content-Type": "application/json", "Authorization": localStorage.getItem("token") },
    };
  }
  axios(reqObj).then(res => {
    const response = res.data;
    if (response.success) {
      success && success(response);
    } else {
      if (response.error === "ACCESS_DENIED") {
        alert("the token expired, please refresh the page and login again");
        return;
      }
      fail && fail(response);
    }
  }).catch(() => {
    // TODO: use a message dialog
    alert("server error");
  });
};

export default axiosWrapper;
