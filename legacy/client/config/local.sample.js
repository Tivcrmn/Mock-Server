var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port: 8080,
  proxyTable: {
    '/api': {
      target: 'http://is-dev.newbanker.cn/api',
      // target: 'http://192.168.0.212:809/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
})
