import {assign} from 'lodash'

const LAYOUT = 'LAYOUT'

// 初始值
const state = {
  layout: {
    loading: true,
    header: true,
    sidebar: true,
    breadcrumb: null,
    footer: true,
    miniNavbar: false,
    klass: 'section-wrapper'
  }
}

// 相关的 mutations
const mutations = {
  [LAYOUT] (state, payload) {
    assign(state.layout, payload)
  }
}

export default {
  state,
  mutations
}
