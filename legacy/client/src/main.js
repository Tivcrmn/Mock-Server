import Vue from 'vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import router from '@/router'
import Filters from '@/common/filter'
import Directive from '@/common/directive'
import Logger from '@/plugin/logger'
import Util from '@/plugin/util'
import Auth from '@/plugin/auth'
import Cookie from '@/plugin/cookie'
import Http from '@/plugin/http'
import Element from '@/plugin/element-ui'
import '@/common/vv'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Filters)
Vue.use(Directive)
Vue.use(Util)
Vue.use(Cookie)
Vue.use(Logger)
Vue.use(Auth)
Vue.use(Http)
Element(Vue)

Vue.use(VeeValidate, {
  errorBagName: 'errBag',
  fieldsBagName: 'fieldBag'
})

router()
