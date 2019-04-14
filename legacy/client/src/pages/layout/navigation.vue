<template>
  <nav id="navbar-sider" class="navbar-static-side" role="navigation">
    <!--
    <div class="sidebar-collapse">
      <ul class="nav metismenu">
        <li class="nav-header logo-wrap">
            <div class="dropdown profile-element">
              <span>
                <img alt="image" class="cursor-pointer full-width" src="../../assets/imgs/logo.jpeg"
                  @click="$router.push({name: 'dashboard'})">
              </span>
            </div>
            <div class="logo-element">NB</div>
        </li>
      </ul>

      <el-menu :unique-opened='true'
        :default-openeds="defaultOpeneds"
        :default-active="defaultActive"
        :router='true'
        ref="menus">
        <template v-for="(menu, m) in menus">
          <el-submenu v-if="menu.menus" :index="(m+1) | toString" v-show="!menu.hidden">
            <template slot='title'>
              <i class="fa" :class="menu.icon"></i>
              <span class="nav-label">{{menu.name}}</span>
            </template>
            <el-menu-item v-for="(item, n) in menu.menus" :index="(m+1)+'-'+(n+1) | toString" :key="n" :route="item.route">
              {{item.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="(m+1) | toString" :route="menu.route" v-show="!menu.hidden">
            <i class="fa" :class="menu.icon"></i>
            <span class="nav-label">{{menu.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>

    </div>

    <div class="sidebar-collapser">
      <a href="" class="sidebar-item" ng-click="sidebar.collapsed = !sidebar.collapsed">
        <i class="fa fa-angle-double-right"></i>
        <span class="collapse-label">收缩侧边栏</span>
      </a>
    </div>
    -->

    <div class="sidebar-wrapper" :class="$store.state.app.layout.miniNavbar ? 'sidebar-collapsed' : ''">

  <div class="sidebar">
    <div class="logo-wrapper">
      <a href="/" target="_self">
        <img class="logo-img" src="../../assets/imgs/logo.png">
      </a>
    </div>

    <div class="sidebar-nav-list-divider">
      <div class="divider"></div>
    </div>

    <div class="sidebar-nav-lists">

      <ul class="sidebar-nav-list">
        <li class="sidebar-nav-item">
          <router-link to="/dashboard" exact class="sidebar-item">
            <img class="sidebar-item-icon" src="https://qiniu.staticfile.org/static/images/sidebar/home.d5ece375.svg">
            <span class="sidebar-item-label">Dashboard</span>
          </router-link>
        </li>
      </ul>

      <div class="sidebar-nav-list-divider">
        <div class="divider"></div>
      </div>

      <ul class="sidebar-nav-list">
        <li class="sidebar-nav-item">
          <router-link to="/bucket" exact class="sidebar-item">
            <img class="sidebar-item-icon" src="https://portal.qiniu.com/static/images/sidebar/pili.svg">
            <span class="sidebar-item-label">运行系统</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/tenant" exact class="sidebar-item">
            <img class="sidebar-item-icon" src="https://portal.qiniu.com/static/images/sidebar/fusion.svg">
            <span class="sidebar-item-label">租户管理</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/user" exact class="sidebar-item">
            <img class="sidebar-item-icon" src="https://qiniu.staticfile.org/static/images/sidebar/account.5a40e0ef.svg">
            <span class="sidebar-item-label">用户管理</span>
          </router-link>
        </li>
      </ul>

      <div class="sidebar-nav-list-divider">
        <div class="divider"></div>
      </div>

      <ul class="sidebar-nav-list">
        <li class="sidebar-nav-item">
          <router-link  :to="'/user/detail/' + user._id" exact class="sidebar-item">
            <img class="sidebar-item-icon" src="https://portal.qiniu.com/static/images/sidebar/certificate.svg">
            <span class="sidebar-item-label">账号设置</span>
          </router-link>
        </li>
      </ul>

    </div>

    <div class="sidebar-collapser">
      <a class="sidebar-item" @click.prevent="toggleClass">
        <img class="sidebar-item-icon collapse-icon" src="../../assets/imgs/collapse.svg">
        <span class="collapse-label">收缩侧边栏</span>
      </a>
    </div>
  </div>

</div>


  </nav>
</template>


<script>
import {
  Menu,
  Submenu,
  MenuItem
} from 'element-ui'
import {each} from 'lodash'
import {setClass, delClass} from '@/common/utils'

const headerH = 60 // header高度

export default {
  components: {
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem
  },
  watch: {
    '$route' (to, from) {
      this.breadcrumbRefresh()
    },
    '$store.state.app.layout.miniNavbar' (v) {
      console.log('v', v)
      this.$nextTick(() => {
        this.toggleClass()
      })
    }
  },
  mounted () {
    window.addEventListener('resize', e => {
      this.containerStyles.minHeight = `${window.innerHeight - headerH}px`
    })
  },
  created () {
    this.breadcrumbRefresh()
    this.$nextTick(() => {
      let barH = document.getElementById('navbar-sider').offsetHeight
      let winH = window.innerHeight
      if (barH < winH) {
        // fixed
        setClass('fixed-sidebar')
      } else {
        // static
        delClass('fixed-sidebar')
      }
    })
  },
  data () {
    const _self = this
    const data = {
      defaultOpeneds: [],
      defaultActive: '',
      crumbs: [],
      menus: [{
        name: 'Dashboard',
        icon: 'fa-dashboard',
        route: {
          name: 'dashboard'
        }
      }, {
        name: 'Demo',
        icon: 'fa-suitcase',
        menus: [{
          name: 'List',
          route: {
            name: 'tenant_list'
          }
        }, {
          name: 'Detail',
          route: {
            name: 'tenant_detail'
          }
        }]
      }],
      containerStyles: {
        minHeight: (window.innerHeight - 60) + 'px'
      }
    }
    function filterRoute (menus) {
      let route = {}
      each(menus, (v, idx) => {
        if (v.route && v.route.name === _self.$route.name) {
          route.index = idx + 1
          route.name = v.route.name
          return false
        }
      })
      return route
    }
    function getActive (menus) {
      each(menus, (v, index) => {
        if (v.route && (v.route.name === _self.$route.name)) {
          data.defaultActive = (index + 1).toString()
          data.defaultOpeneds = [index + 1]
        } else {
          let route = filterRoute(v.menus)
          if (route.name === _self.$route.name) {
            data.defaultActive = (index + 1).toString() + '-' + route.index
            data.defaultOpeneds = [route.index + 1]
          }
        }
      })
    }
    getActive(data.menus)
    return data
  },
  computed: {
    user () {
      return this.$store.state.user.account
    }
  },
  methods: {
    breadcrumbRefresh () {
      this.crumbs = this.$route.meta.crumbs
    },
    toggleMinibar () {
      /*
      this.$store.commit('LAYOUT', {
        miniNavbar: !this.$store.state.app.layout.miniNavbar
      })
      */
    },
    toggleClass () {
      // let isMiniMenu = this.$store.state.app.layout.miniNavbar
      let isMiniBar = document.body.getAttribute('class', 'mini-navbar').indexOf('mini-navbar') > -1
      isMiniBar ? delClass('mini-navbar') : setClass('mini-navbar')
    }
  }
}
</script>

<style lang="less">
body.fixed-sidebar {
  #navbar-sider {
    overflow-y: auto;
  }
}
#navbar-sider {
  height: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  .logo-wrap {
    padding: 17px 25px 16px;
    .logo-element {
      padding: 1px 0;
      color: #1cc09f;
      color: #20a0ff;
      text-shadow: 1px 1px 20px #bdbdbd;
    }
  }
  ul {
    > li {

      &.nav-header {
        background: #fff;
        border-bottom: 1px #ddd solid;
      }
    }
  }
}

.sidebar-wrapper {
  position: relative;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  .sidebar {
    position: relative;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 230px;
    background-color: #f5f7fa;
    border-right: 1px solid #e6e9f0;
    -webkit-transition: all .15s;
    transition: all .15s;
    .logo-wrapper {
      line-height: 90px;
      text-align: center;
      img.logo-img {
        max-width: 100px;
        padding-top: 15px;
      }
    }

    .sidebar-nav-lists {
      overflow: hidden;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .sidebar-nav-list {
      padding: 0;
      margin-bottom: 0;
      list-style: none;

      > a {
        display: block;
      }

      .sidebar-item {
        height: 45px;
        padding: 0 27px;
        margin: 0 0 5px;
        line-height: 45px;
        color: #8d9199;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        font-size: 14px;
        white-space: nowrap;
        display: block;
      }
      .sidebar-item-icon {
        width: 20px;
        margin-right: 14px;
        vertical-align: middle;
      }
      .sidebar-item-label {
        vertical-align: middle;
      }
      .sidebar-nav-item > a:hover {
        background-color: #e1edfa;
      }
    }

    .sidebar-nav-list-divider {
      margin: 30px 0;
      height: 1px;
      .divider {
        margin: 0 auto;
        height: 1px;
        width: 180px;
        background-color: #e6e9f0;
      }
    }

    .sidebar-collapser {
      background-color: #f5f7fa;
      border-top: 1px solid #e2e5ea;
      > a {
        display: block;
      }
      .sidebar-item {
        height: 47px;
        padding: 0 27px;
        line-height: 47px;
        color: #8d9199;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }

  // active link
  a.sidebar-item.router-link-active {
    background-color: #e1edfa;
    border-right: 2px #0081ff solid!important;
  }
}
.sidebar-collapsed {
  .sidebar {
    width: 80px;
    .collapse-label,
    .sidebar-item-has-more,
    .sidebar-item-label {
      display: none;
    }
    .sidebar-item-icon {
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
  }
}
body.mini-navbar {
  #page-wrapper {
    margin: 0 0 0 80px;
  }
  .navbar-static-side {
    width: 80px;
  }
  #navbar-sider {
    .el-menu {
      li {
        position: relative;
        text-align: center;
        i.fa {
          margin: initial;
        }
      }
    }
  }
  .sidebar {
    width: 80px;
    .logo-wrapper img.logo-img {
      max-width: 68px;
    }
    .collapse-label,
    .sidebar-item-has-more,
    .sidebar-item-label {
      display: none;
    }
    .sidebar-item-icon {
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .sidebar-nav-list-divider {
      .divider {
        width: 100%;
      }
    }
  }
}
</style>
