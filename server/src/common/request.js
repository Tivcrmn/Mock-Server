/**
 * 用axios来发起http请求
 */
import axios from "axios";

let headers = {};
headers = {
  "Authorization": "Bearer xxx"
};
const instance = axios.create({ headers });

export default instance;
