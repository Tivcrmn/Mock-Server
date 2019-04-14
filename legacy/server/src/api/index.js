import {Router} from 'express'
import {isEqual} from 'lodash'
import apiResult from '@/common/result'
import apiDatas from '@/api/apiDatas'
import conext from '@/middlewares/conext'
import names from '@/api/names'
import {Api} from '@/methods'

const router = Router()

const error = (res, code = 404, data = {error: 'NOT_FOUND'}) => {
  res.status(code).send(apiResult(data))
}

/**
 * 现在支持的数据类型 
 * cn-name
 * age
 * cn-gende
 * cn-id
 * number
 * string
 * en-gende
 * mobile 
 */
router.all('/api/:tenant/:bucket/:version/*', conext(async (req, res) => {
  let opts = {
    tenant: req.params.tenant,
    bucket: req.params.bucket,
    version: req.params.version,
    url: req.params[0],
    method: req.method
  }
  let apiRes = await Api.getByQuery(opts)
  if (!apiRes.length) {
    return error(res)
  }
  if (apiRes[0].disabled) {
    return res.send(apiResult({error: 'API_HAS_BEEN_DISABLED'}))  
  }
  let fields = apiRes[0].fields
  res.send(apiDatas({fields: fields, repeat: apiRes[0].repeat}))

  /*
  res.send(apiResult({
    source: 'api-server',
    params: req.params,
    method: req.method,
    tenant: req.params.tenant,
    api: api,
    url: req.url
  }))
  */
}))

export default router
