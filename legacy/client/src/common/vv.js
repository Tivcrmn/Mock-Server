/**
 * VeeValidate自定义验证规则
 * validate方法可以在@/common/utils里定义，然后import进来使用
 */
import VeeValidate from 'vee-validate'
import {isMobile} from '@/common/utils'

const mobile = {
  getMessage: field => {
    return '手机号码格式不对'
  },
  validate: function (value, args) {
    return isMobile(value)
  }
}

VeeValidate.Validator.extend('mobile', mobile)
