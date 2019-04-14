import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import App from '@/App.vue'
import store from '@/store'
import {isNull, each} from 'lodash'
import {COOKIE} from '@/common/const'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== undefined) {
    let name = to.name
    if (store.state.app.layout.miniNavbar) {
      name = name + ' mini-navbar'
    }
    document.body.setAttribute('class', name)
  }

  let user = Vue.cookie.get(COOKIE.KEY_USER)
  let token = Vue.cookie.get(COOKIE.KEY_TOKEN)

  if (Vue.PASSPORT && isNull(store.state.user.token)) {
    store.commit('UPDATE_USER', {
      user: user,
      token: token
    })
  }

  if (to.meta.needLogin && (!token || !user)) {
    return next({name: 'login', query: {from: from.fullPath}})
  }
  next()
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.crumbs) {
    router.app.$nextTick(() => {
      store.commit('LAYOUT', {
        breadcrumb: to.meta.crumbs
      })
    })
  }

  // auto remove animated
  router.app.$nextTick(() => {
    each(document.getElementsByClassName('wrapper-content'), node => {
      if (node) {
        setTimeout(() => {
          node.className = node.className.replace('animated', '')
        }, 800)
      }
    })
  })
})

window.onfocus = () => {
  // 页面重新获取焦点后检测登录情况
  // TODO
}

export default () => {
  new Vue({
    render (h) {
      return h(App)
    },
    store,
    router
  }).$mount('#app')
}

export {router}
