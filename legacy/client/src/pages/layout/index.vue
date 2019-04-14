<template>
  <!-- Wrapper-->
  <div id="wrapper">

    <!-- Navigation -->
    <navigation></navigation>

    <!-- Page wraper -->
    <div id="page-wrapper" class="gray-bg- white-bg" :style="containerStyles">

      <!-- Page wrapper -->
      <top-nav-bar></top-nav-bar>

      <breadcrumb></breadcrumb>

      <!--
      <el-breadcrumb>
        <el-breadcrumb-item v-for="crumb in crumbs" :to="crumb.to">
          {{crumb.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      -->

      <!-- Main view
      {{> yield}} -->
      <router-view></router-view>

      <!-- Footer -->
      <footer-bar v-if="1==2"></footer-bar>

    </div>
    <!-- End page wrapper-->

    <!-- Right Sidebar
    {{> rightSidebar }}-->

  </div>
  <!-- End wrapper-->
</template>

<script>
import Navigation from './navigation.vue'
import TopNavBar from './top-nav-bar.vue'
import Breadcrumb from './breadcrumb.vue'
import FooterBar from './footer.vue'
import {
  mapGetters,
  mapActions
} from 'vuex'

const headerH = 0 // header高度

export default {
  components: {
    Navigation,
    TopNavBar,
    Breadcrumb,
    FooterBar
  },

  watch: {
    '$route' (to, from) {
      // this.breadcrumbRefresh()
    }
  },

  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.resizeBody)
      this.resizeBody()
    })
  },

  created () {
    this.breadcrumbRefresh()
  },

  computed: {
    ...mapGetters({
      layout: 'getLayout'
    }),
    appClass () {
      let kla = [this.layout.klass]

      // 加入以router命名class
      kla.push('wrap-' + this.$route.path.replace(/\//, '').split('/').join('-'))
      return kla.join(' ')
    }
  },

  data () {
    return {
      containerStyles: {
        minHeight: (window.innerHeight - 60) + 'px'
      }
    }
  },

  methods: {
    breadcrumbRefresh () {
      // this.crumbs = this.$route.meta.crumbs
    },
    resizeBody () {
      this.containerStyles.minHeight = `${window.innerHeight - headerH}px`
    },
    ...mapActions(['logout'])
  }
}
</script>

<style lang="less">
</style>
