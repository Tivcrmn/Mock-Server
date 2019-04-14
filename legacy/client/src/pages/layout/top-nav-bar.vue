<template name="topNavbar">
  <div id="top-nav-bar" class="row border-bottom">
    <nav class="navbar navbar-static-top mb0 pl30">

      <ul class="nav navbar-top-links navbar-left">
        <li class="dropdown" v-dropdown>
          <a class="text-default"><i class="fa fa-bars"></i> 快速入口</a>
          <ul class="dropdown-menu dropdown-fastgo animated fadeInDown-">
            <div class="triangle"></div>
            <li v-if="user.isAdmin">
              <router-link to="/tenant/create" exact>
                <img src="https://qiniu.staticfile.org/static/images/sidebar/home.d5ece375.svg">
                <div>新建租户</div>
              </router-link>
            </li>
            <li v-if="user.isAdmin || user.isTenantAdmin">
              <router-link to="/user/create" exact>
                <img src="https://portal.qiniu.com/static/images/product-panel/certificate.svg">
                <div>新建用户</div>
              </router-link>
            </li>
            <li>
              <router-link to="/bucket/create" exact>
                <img src="https://portal.qiniu.com/static/images/product-panel/pili.svg">
                <div>新建系统</div>
              </router-link>
            </li>
            <li>
              <router-link :to="'/user/detail/' + user._id" exact>
                <img src="https://qiniu.staticfile.org/static/images/sidebar/account.5a40e0ef.svg">
                <div>修改信息</div>
              </router-link>
            </li>
            <li class="divider"></li>
          </ul>
        </li>
      </ul>

      <ul class="nav navbar-top-links navbar-right">
        <li v-if="user">
          <span class="m-r-sm text-muted welcome-message">
             Hi, 
            <span v-if="user.isTenantAdmin" style="color: green">管理员</span>
            <span v-if="user.isAdmin" style="color: red">超级管理员
            </span>{{user.loginName}}</span>
        </li>
        <li class="divider color-gray">|</li>
        <li>
          <a href="" @click.prevent="logout">退出</a>
        </li>
      </ul>

    </nav>

  </div>
</template>

<script>
export default {
  name: 'TopNavBar',
  data () {
    return {}
  },

  computed: {
    user () {
      return this.$store.state.user.account
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('LOGOUT')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less">
.navbar {
  background-color: #fff;
}

li.dropdown a.text-default {
  color: #7a8599;
  font-weight: normal;
  &:hover {
    color: #555;
  }
}
.dropdown-menu.dropdown-fastgo {
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  border: 1px solid #e6e9f0;
  border-radius: 0 0 3px 3px;
  padding: 30px;
  width: 382px;
  .triangle:before {
    content: '';
    display: block;
    border: 8px solid transparent;
    border-bottom-color: #e6e9f0;
    position: absolute;
    top: -16px;
    left: 45px;
  }
  .triangle:after {
    content: '';
    display: block;
    border: 8px solid transparent;
    border-bottom-color: #fff;
    position: absolute;
    top: -15px;
    left: 45px;
  }
  > li {
    display: inline-block;
    text-align: center;
    > a {
      padding: 20px 20px 10px;
      text-align: center;
      &:hover {
        background-color: rgba(245, 245, 245, 0.35);
      }
      > img {
        display: inline-block;
        max-width: 40px;
      }
    }
  }
}
</style>
