// Authorization
import {COOKIE} from '@/common/const'

const __AUTH__ = (Vue, context) => {
  let logout = () => {
    Vue.cookie.remove(COOKIE.KEY_TOKEN)
    Vue.cookie.remove(COOKIE.KEY_USER)
  }

  return {
    logout
  }
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  const _check = () => {
    // return Vue.cookie.get(Vue.const.COOKIE.KEY_TOKEN) ? true : false
    return Vue.cookie.get(COOKIE.KEY_TOKEN)
  }

  Vue.PASSPORT = _check()

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        // return _auth.bind(this)
        return new __AUTH__(Vue, this)
      }
    },
    $PASSPORT: {
      get () {
        return _check()
      }
    },
    $user: {
      get () {
        return this.$store.state.user
      }
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
