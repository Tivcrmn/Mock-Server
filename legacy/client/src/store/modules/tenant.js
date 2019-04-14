import Vue from 'vue'
import {cloneDeep} from 'lodash'

import {RESPONSE_CATCH} from '@/common/response'

export const TENANT_SAVE = 'TENANT_SAVE'
export const TENANT_DETAIL = 'TENANT_DETAIL'
export const TENANT_DETAIL_SAVE = 'TENANT_DETAIL_SAVE'
export const TENANT_LIST = 'TENANT_LIST'
export const TENANT_DELETE = 'TENANT_DELETE'
export const TENANT_POWER = 'TENANT_POWER'
const state = {
  list: null
}

const mutations = {
  [TENANT_LIST] (state, list) {
    state.list = list
  }
}

const actions = {
  async [TENANT_SAVE] ({commit, dispatch}, datas) {
    console.log(datas)
    let tenant = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/tenant/create', tenant)
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [TENANT_DETAIL] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .get('/api-self/v1/tenant/detail', {params: {'id': id}})
        .then(res => {
          resolve(res.body)
          console.log(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [TENANT_DETAIL_SAVE] ({commit, dispatch}, datas) {
    let tenant = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/tenant/detail', tenant)
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [TENANT_LIST] ({commit, dispatch}, datas) {
    let data = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .get('/api-self/v1/tenant/list', {params: data})
        .then(res => {
          commit(TENANT_LIST, res.body.data)
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [TENANT_DELETE] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .delete('/api-self/v1/tenant/detail', {body: {id: id}})
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [TENANT_POWER] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/tenant/power', {id: id})
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
