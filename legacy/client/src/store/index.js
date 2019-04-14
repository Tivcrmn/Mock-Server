import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'

// 导入各个模块的初始状态和 mutations
import * as actions from './actions'
import * as getters from './getters'
import tmp from './modules/tmp'
import app from './modules/app'
import user from './modules/user'
import tenant from './modules/tenant'
import bucket from './modules/bucket'
import api from './modules/api'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    tmp,
    app,
    user,
    tenant,
    bucket,
    api
  },
  strict: debug,
  plugins: debug ? [logger()] : []
})
