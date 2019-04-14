import moment from 'moment'
import numeral from 'numeral'
import {isNull, isNumber, round} from 'lodash'
import {maskmobile, maskIdNumber, num2str, img} from '@/common/utils'

export default {
  install (Vue, options) {
    Vue.filter('isNull', (value, str) => {
      return isNull(value) ? '-' : (str || value)
    })

    Vue.filter('toString', (str) => {
      return str.toString()
    })

    Vue.filter('reverse', (value) => {
      return value.split('').reverse().join('')
    })

    Vue.filter('moment', (value, pattern = 'YYYY-MM-DD HH:mm') => {
      if (!value || value === '') return ''
      return moment(value).format(pattern)
    })

    Vue.filter('maskMobile', (mobile) => {
      return maskmobile(mobile)
    })

    Vue.filter('maskIdNumber', (id) => {
      return maskIdNumber(id)
    })

    Vue.filter('formatDivider', (str, display = ' ', divider = '|') => {
      if (str === null || str === undefined || str === '') {
        return
      }
      return str.split(divider).join(display)
    })

    Vue.filter('currency', (value, prefix = '￥', suffix = '') => {
      if (isNumber(value)) {
        return prefix + numeral(round(value, 2)).format('0,0.00') + suffix
      } else {
        return value
      }
    })

    Vue.filter('money', (value) => {
      if (value >= 100000000) {
        return `${value / 100000000}亿`
      }
      if (value >= 10000000 && value < 100000000) {
        return `${value / 10000000}千万`
      }
      if (value >= 10000 && value < 10000000) {
        return `${value / 10000}万`
      }
      return value
    })

    Vue.filter('num2str', num => {
      return num2str(num)
    })

    Vue.filter('img', img)
  }
}
