import Vue from 'vue'
import {cloneDeep} from 'lodash'

import {RESPONSE_CATCH} from '@/common/response'

export const BUCKET_SAVE = 'BUCKET_SAVE'
export const BUCKET_LIST = 'BUCKET_LIST'
export const BUCKET_DELETE = 'BUCKET_DELETE'
export const BUCKET_POWER = 'BUCKET_POWER'
const state = {
  list: null
}

const mutations = {
  [BUCKET_LIST] (state, list) {
    state.list = list
  }
}

const actions = {
  async [BUCKET_SAVE] ({commit, dispatch}, datas) {
    console.log(datas)
    let bucket = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/bucket/create', bucket)
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [BUCKET_LIST] ({commit, dispatch}, datas) {
    let data = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .get('/api-self/v1/bucket/list', {params: data})
        .then(res => {
          commit(BUCKET_LIST, res.body.data)
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [BUCKET_DELETE] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .delete('/api-self/v1/bucket/detail', {body: {id: id}})
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [BUCKET_POWER] ({commit}, data) {
    let datas = cloneDeep(data)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/bucket/power', datas)
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
