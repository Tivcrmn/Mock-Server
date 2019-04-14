// global util plugin
import {each, clone, merge, cloneDeep} from 'lodash'
import {router} from '@/router'
import {CF} from '@/common/const'

let Utils = () => {}

// merge router query & search form data
Utils.prototype.build = (paramsObj, size) => {
  paramsObj = paramsObj || {}
  let obj = {}
  each(clone(merge(paramsObj, router.currentRoute.query)), (v, k) => {
    if (!(v === '' || v === 'null')) {
      obj[k] = v
    }
  })
  if (!router.currentRoute.query.page) {
    obj.page = 1
  }
  if (!router.currentRoute.query.size) {
    obj.size = size || CF.PAGE_SIZE
  }
  return obj
}

// diff between tow objects
Utils.prototype.diff = (oa, ob) => {
  let _diff = (a, b) => {
    let arr = []
    each(a, (v, k) => {
      if (v !== b[k]) {
        arr.push({k: k, ov: v, nv: b[k] || null})
      }
    })
    return arr
  }
  return _diff(oa, ob)
}

let util = new Utils()

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  Vue.$util = util

  Object.defineProperties(Vue.prototype, {
    $util: {
      get () {
        return util
      }
    },
    $build: {
      get () {
        return util.build
      }
    },
    $resetPage: {
      get () {
        return (listData) => {
          let _page = ~~this.$route.query.page
          if (listData && listData.length === 1 && _page > 1) {
            this.$router.push({
              path: this.$route.path,
              query: merge(cloneDeep(this.$route.query), {
                page: _page - 1
              })
            })
          }
        }
      }
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
