import Vue from 'vue'
import {cloneDeep} from 'lodash'

import {RESPONSE_CATCH} from '@/common/response'

export const API_SAVE = 'API_SAVE'
export const API_LIST = 'API_LIST'
export const API_DELETE = 'API_DELETE'
export const API_POWER = 'API_POWER'
export const API_DETAIL = 'API_DETAIL'
export const API_DETAIL_SAVE = 'API_DETAIL_SAVE'
const state = {
  list: null
}

const mutations = {
  [API_LIST] (state, list) {
    state.list = list
  }
}

const actions = {
  async [API_SAVE] ({commit, dispatch}, datas) {
    let api = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/api/create', api)
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [API_LIST] ({commit, dispatch}, datas) {
    let data = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .get('/api-self/v1/api/list', {params: data})
        .then(res => {
          commit(API_LIST, res.body.data)
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [API_DELETE] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .delete('/api-self/v1/api/detail', {body: {id: id}})
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [API_POWER] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/api/power', {id: id})
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [API_DETAIL] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .get('/api-self/v1/api/detail', {params: {'id': id}})
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
  async [API_DETAIL_SAVE] ({commit}, datas) {
    let api = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/api/detail', api)
        .then(res => {
          resolve(res.body)
          console.log(res.body)
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
