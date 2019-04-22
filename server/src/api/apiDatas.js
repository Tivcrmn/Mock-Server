import apiResult from "@/common/result";
import apiUtil from "@/api/apiUtil";

export default data => {
  let datas = [];
  for (let i = 0; i < data.repeat; i++) {
    let field = {};
    for (let j = 0; j < data.fields.length; j++) {
      field[data.fields[j].fieldName] = apiUtil.gen(data.fields[j].fieldType);
    }
    datas.push(field);
  }
  return apiResult({ data: datas });
};
