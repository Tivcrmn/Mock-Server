// /api/{TENANT}/{VERSION}/user/list
export default {
  url: "/api/v1/missile",
  tenant: "dsdfs-sdfsd-sdsdf", // NewBanker
  bucket: "PE",
  adminId: "sdsdf-sdfsdf-sdfsd",
  method: "POST",
  query: {
    param1: 12345,
    param2: 67890
  },
  apiResult: {},
  version: "v1",
  fields: [
    {
      name: "name", // 字段名为name
      type: "name", // 类型为姓名
      random: true, // 是否随机生成
      lang: "cn" // 中文/英文
    },
    {
      name: "age",
      type: "age",
      random: true
    },
    {
      name: "gender",
      type: "gender",
      random: true,
      returnType: "boolean" // or string
    },
    {
      name: "id",
      type: "id",
      random: true
    },
    {
      name: "avatar",
      type: "avatar",
      random: true
    },
    {
      amount: "amount",
      type: "number",
      random: true,
      min: 1000,
      max: 10000
    },
    {
      name: "mobile",
      type: "mobile",
      random: true
    },
    {
      name: "someKey1",
      type: "string",
      random: true,
      leng: 100, // 长度
      lang: "en" // cn/en
    },
    {
      name: "someKey2",
      type: "object",
      random: false,
      data: "{aa: 111, bb: 22, cc: 33}"
    },
    {
      name: "someKey3",
      type: "array",
      random: false,
      data: ["aa", "bb", "cc"]
    }
  ]
};
