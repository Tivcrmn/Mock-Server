import Cookie from 'localstorage-cookie'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Vue.cookie = Cookie

  Object.defineProperties(Vue.prototype, {
    $cookie: {
      get () {
        return Cookie
      }
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
