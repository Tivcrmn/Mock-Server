// 自定义指令
export default {
  install (Vue, options) {
    // 设置背景色
    Vue.directive('bgit', (el, binding) => {
      el.style.backgroundColor = binding.value
    })

    // input聚焦
    Vue.directive('focus', {
      inserted: (el) => {
        el.focus()
      }
    })

    Vue.directive('img', {
      inserted: (el, binding) => {
        let color = Math.floor(Math.random() * 1000000)
        el.style.backgroundColor = `#${color}`

        let img = new Image()
        img.src = binding.value
        img.onload = () => {
          el.style.backgroundImage = `url(${binding.value})`
        }
      }
    })

    // dropdown menu
    Vue.directive('dropdown', {
      inserted: (el, binding) => {
        let opened = 'dropdown-opened'
        el.onmouseenter = () => {
          if (el.getAttribute('class').indexOf(opened) === -1) {
            el.setAttribute('class', `${el.getAttribute('class')} ${opened}`)
          }
        }
        el.onmouseleave = () => {
          if (el.getAttribute('class').indexOf(opened) > -1) {
            el.setAttribute('class', el.getAttribute('class').replace(' ' + opened, ''))
          }
        }
      }
    })

    // textarea auto height
    Vue.directive('auto-textarea', {
      update: (el) => {
        window.el = el
        if (el.value !== '' && el.style.height === '') {
          el.style.height = `${Math.min(el.scrollHeight, 250)}px`
        }
      }
    })
  }
}
