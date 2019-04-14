<template>
  <div id="breadcrumb" class="row wrapper border-bottom white-bg page-heading" v-if="bc">
    <div class="col-lg-10">
      <h2>{{bc.title}}</h2>
      <ol class="breadcrumb">
        <template v-for="(item, index) of bc.list">
          <li class="active" v-if="index == bc.list.length - 1">{{item.name}}</li>
          <li v-else>
            <template v-if="item.link">
              <router-link :to="item.link">{{item.name}}</router-link>
            </template>
            <template v-else>{{item.name}}</template>
          </li>
        </template>
      </ol>
    </div>
    <div class="col-lg-2 align-right">
      <label class="btn btn-sm btn-white go-back" v-if="bc.back" @click="$router.go(bc.step || -1)">
        <i class="fa fa-angle-left"></i> {{bc.backTit || '返回'}}
      </label>
    </div>
  </div>
</template>

<script>
/**
// usage
this.$store.commit('LAYOUT', {
  breadcrumb: {
    title: '',
    fixed: false,
    list: [
      {
        name: '客户管理',
        link: '/xx/xx'
      },
      {
        name: '客户列表',
        link: '/tenants/list'
      },
      {
        name: '机构列表'
      }
    ]
  }
})
*/
export default {
  name: 'Breadcrumb',
  /*
  props: {
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    }
  },
  */
  computed: {
    bc () {
      return this.$store.state.app.layout.breadcrumb
    },
    fixed () {
      return this.bc.fixed === undefined || this.bc.fixed ? ' affix' : ''
    }
  },

  watch: {
    '$route' () {
      // 一旦路由变更就隐藏breadcrumbs
      // 下个视图要不要显示由下个视图说了算
      this.$store.commit('LAYOUT', {
        breadcrumb: null
      })
    }
  }
}
</script>

<style lang="less">
#breadcrumb {
  .breadcrumb > li.active {
    color: #bbb;
  }
  .go-back {
    position: absolute;
    top: 14px;
    right: 15px;
  }
}
</style>
