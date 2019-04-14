// http plugin (wrappered by Vue.http)

/*
Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.localStorage.get(Vue.env.COOKIE.KEY_TOKEN)
Vue.http.options.emulateJSON = true
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
*/
import {router} from '@/router'
import {COOKIE, CF, TENANT} from '@/common/const'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  let setAuth = () => {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.cookie.get(COOKIE.KEY_TOKEN)
    Vue.http.options.emulateJSON = true
  }

  // global settings
  Vue.http.interceptors.push(function (request, next) {
    // modify headers
    request.headers.set('X-CSRF-TOKEN', Date.now().toString())

    if (request.url) {
      request.url = request.url.replace('/api/v1/', `/api/v1/${TENANT}/`)
    }

    // set current page
    if (request.params.page) {
      request.params.page = parseInt(request.params.page) - (CF.PAGE_START === 0 ? 1 : 0)
    }

    setAuth()

    // continue to next interceptor
    next(res => {
      // token失效 code === 3
      if (res.body && res.body.statusCode === 3) {
        Vue.cookie.remove(COOKIE.KEY_TOKEN)
        Vue.cookie.remove(COOKIE.KEY_USER)
        Vue.cookie.remove(COOKIE.KEY_PERMISSION)
        router.push({
          name: 'login',
          query: {
            from: window.location.pathname + window.location.search
          }
        })
      }
    })
  })

  Vue.req = (() => {
    setAuth()
    return Vue.http
  }).call(this)

  Object.defineProperties(Vue.prototype, {
    $req: {
      get () {
        setAuth()
        return Vue.http
      }
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
