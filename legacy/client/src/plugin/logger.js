// vue beautiful console logger plugin
// console.log("%c ", "background: url(/logo.png) no-repeat")
import {each} from 'lodash'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  function _logger () {
    let newArgs = ['%cNB-LOGGER', 'background:#0092ff;color:#fff;padding:0 3px']
    each(arguments, (args, index) => {
      if (index === 0 && typeof args === 'string') {
        newArgs.push(args)
      } else {
        newArgs.push(JSON.parse(JSON.stringify(args)))
      }
    })
    console.log.apply(this, newArgs)
  }

  Vue.log = _logger

  Object.defineProperties(Vue.prototype, {
    $log: {
      get () {
        return _logger
      }
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
