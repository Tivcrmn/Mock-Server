<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
export default {
  name: 'app',
  created () {
    // only for dev test
    window.that = this
  }
}
</script>

<style lang="less">
#app {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: flex;
  height: 100%;
}
@import './assets/less/style.less';
@import './assets/less/components/pagination.less';
@import '../node_modules/element-ui/lib/theme-default/index.css';
@import './assets/less/animatecss/animate.css';
</style>
