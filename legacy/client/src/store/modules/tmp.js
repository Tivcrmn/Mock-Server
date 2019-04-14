/**
 * 临时保存某些信息
 * 只用于某些临时生成的变量
 */
import {assign} from 'lodash'

const TMP = 'TMP'

const state = {}

const mutations = {
  [TMP] (state, payload) {
    assign(state, payload)
  }
}

export default {
  state,
  mutations
}
