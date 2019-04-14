// global const config

exports.TENANT = 'xxx'

exports.CF = {
  PAGE_START: 0, // 分页的第一页是从0还是1开始
  PAGE_SIZE: 10
}

exports.COOKIE = {
  KEY_TOKEN: 'access_token',
  KEY_USER: 'nbuser',
  MAX_AGE: 1000 * 60 * 60 * 24 // ms
}

// error code
exports.ERRORS = {
  PARAMS_ERROR: '参数错误',
  OPEN_ACCOUNT_FIRST: '账户未开通'
}

// 来源 1:pc 2:ios 3:android 4:another app 5:h5 6:wx
exports.SOURCE = {
  '1': 'PC',
  '2': 'IOS',
  '3': 'ANDROID',
  '4': 'OTHER APP',
  '5': 'H5',
  '6': 'WX'
}

exports.SOME_RULE = {}
exports.DISABLED = {
  '是': '启用',
  '否': '禁用'
}
exports.MOCKTYPE = {
  'cn-name': '中国姓名',
  'age': '年龄',
  'cn-gender': '汉语性别',
  'en-gender': '英语性别',
  'mobile': '中国手机号',
  'cn-id': '中国身份证号',
  'string': '随机字符串',
  'number': '随机数字',
  'object': '对象',
  'array': '数组',
  '': '选择相应的数据类型'
}

exports.API_TYPE = {
  'GET': 'GET',
  'POST': 'POST',
  'DELETE': 'DELETE'
}

exports.MOCK_EXAMPLE = {
  'data': [
     ['cn-name', '中国姓名', '习近平', '李克强', '王岐山'],
     ['age', '年龄', 18, 28, 38],
     ['cn-gender', '汉语性别', '男', '女'],
     ['en-gender', '英语性别', 'male', 'female'],
     ['mobile', '中国手机号', '13312312323', '13213212342', '13534554323'],
     ['cn-id', '中国身份证号', '6101041987040792384', '6101041987040792344', '6101141987040792384'],
     ['string', '随机字符串', 'dsafadsfasdf', 'dsafdasfasdfsadf', 'dasfasdfasdf'],
     ['number', '随机数', '213213', '213213', '21321312'],
     ['object', '对象'],
     ['array', '数组']]
}

exports.DATA_TYPE = {
  'string': 'string',
  'number': 'number'
}
