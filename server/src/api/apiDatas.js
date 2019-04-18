import {
  isEmpty,
  each
} from "lodash"
import apiResult from "@/common/result"
import TYPES from "@/api/TYPES"
import apiUtil from "@/api/apiUtil"

export default data => {

  let datas = []
  for (let i = 0; i < data.repeat; i++) {
    let field = {}
    for (let j = 0; j < data.fields.length; j++) {
      field[data.fields[j].fieldName] = apiUtil.gen(data.fields[j].fieldType)
    }
    datas.push(field)
  }
  return apiResult({data: datas})
}

/*
url: {type: String}, // API地址
tenant: {type: String}, // 所属tenant
bucket: {type: String}, // 所属bucket
adminId: {type: String}, // 操作人
method: {type: String}, // api方法
query: {type: Object, default: {}}, // query参数
fields: {type: Object, default: {}}, // 返回的字段
version: {type: String, default: "v1"}, // api version(v1/v2/v3...)
permission: {type: String, default: null}, // API权限
disabled: {type: Boolean, default: false},
createTime: {type: Date, default: Date.now},
updateTime: {type: Date, default: Date.now}
*/
