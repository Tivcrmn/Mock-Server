// 登录用户信息
import Vue from 'vue'
import {cloneDeep} from 'lodash'
import {RESPONSE_CATCH} from '@/common/response'
import {COOKIE} from '@/common/const'
// import bus from '@/bus'

export const USER = 'USER'
export const TOKEN = 'TOKEN'
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_USER = 'UPDATE_USER'
export const USER_LIST = 'USER_LIST'
export const USER_SAVE = 'USER_SAVE'
export const USER_DETAIL = 'USER_DETAIL'
export const USER_DETAIL_SAVE = 'USER_DETAIL_SAVE'
export const USER_DELETE = 'USER_DELETE'
export const USER_POWER = 'USER_POWER'

const state = {
  account: null,
  token: null,
  list: null
}

const mutations = {
  [USER] (state, user) {
    state.account = user
  },

  [UPDATE_USER] (state, pa) {
    state.account = pa.user
    state.token = pa.token
  },
  [USER_LIST] (state, list) {
    state.list = list
  }
}

const actions = {
  async [LOGIN] ({commit, dispatch}, datas) {
    let user = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/login', user)
        .then(res => {
          let o = res.body
          if (o.success) {
            commit('UPDATE_USER', {
              user: o.data.user,
              token: o.data.token
            })
            Vue.cookie.set(COOKIE.KEY_USER, o.data.user, {
              maxAge: COOKIE.MAX_AGE
            })
            Vue.cookie.set(COOKIE.KEY_TOKEN, o.data.token, {
              maxAge: COOKIE.MAX_AGE
            })
          }
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },

  [LOGOUT] ({commit}) {
    // 置空USER状态
    commit('UPDATE_USER', {user: null, token: null, permission: null})
    // 清除本地临时存储
    Vue.cookie.remove(COOKIE.KEY_TOKEN)
    Vue.cookie.remove(COOKIE.KEY_USER)
  },
  async [USER_LIST] ({commit, dispatch}, datas) {
    let data = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .get('/api-self/v1/user/list', {params: data})
        .then(res => {
          commit(USER_LIST, res.body.data)
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [USER_SAVE] ({commit, dispatch}, datas) {
    let user = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/register', user)
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [USER_DETAIL] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .get('/api-self/v1/user/detail', {params: {'id': id}})
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
  async [USER_DETAIL_SAVE] ({commit, dispatch}, datas) {
    let user = cloneDeep(datas)
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/user/detail', user)
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [USER_DELETE] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .delete('/api-self/v1/user/detail', {body: {id: id}})
        .then(res => {
          resolve(res.body)
        })
        .catch(err => {
          RESPONSE_CATCH(err)
          reject(err)
        })
    })
  },
  async [USER_POWER] ({commit}, id) {
    return await new Promise((resolve, reject) => {
      Vue.req
        .post('/api-self/v1/user/power', {id: id})
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
