<template>
  <div id="page-login" class="gray-bg full-width">

    <div class="middle-box text-center loginscreen animated fadeInDown pt10">
      <div>
        <h2><img src="../assets/imgs/logo.png" style="width:100%"></h2>
        <h3 style="margin-top:10%;margin-bottom:50px;">
          <router-link to="/" style="color:#333">NB MOCK SERVER</router-link>
        </h3>
        <form class="m-t" action="post" @submit.prevent="submit">
          <div class="form-group">
            <input type="text" class="form-control"
              v-focus
              v-model="user.loginName"
              placeholder="输入账号" required="">
          </div>
          <div class="form-group">
            <input type="password" class="form-control"
              v-model="user.password"
              placeholder="输入密码" required="">
          </div>

          <button type="submit" class="btn btn-primary block full-width m-b btn-lg"
            v-if="!success"
            @click.prevent="submit($event)"
            v-bind:disabled="disabled">登录</button>
          <button type="submit" class="btn btn-primary block full-width m-b btn-lg"
            v-if="success"
            v-bind:disabled="disabled"
            @click.prevent="">
            <span class="fa fa-check"></span> 登录成功
          </button>

          <p class="text-muted text-center pt20"><small>忘记密码请联系管理员</small></p>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions} from 'vuex'
import {Loading} from 'element-ui'
export default {
  data () {
    return {
      success: null,
      disabled: false,
      user: {
        loginName: '',
        password: ''
      }
    }
  },
  created () {
    if (this.$store.state.user.token) {
      this.$router.push({name: 'dashboard'})
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    loading () {
      this.loadingInstance = Loading.service({ fullscreen: true })
    },
    async submit (e) {
      if (this.user.loginName === '') {
        this.$message.error('请输入您的账号')
        return
      }
      if (this.user.password === '') {
        this.$message.error('请输入登录密码')
        return
      }

      this.disabled = true
      this.loading()

      let res = await this.LOGIN(this.user)
      this.loadingInstance && this.loadingInstance.close()

      if (!res.success) {
        this.disabled = false
        this.loadingInstance && this.loadingInstance.close()
        if (res.error === 'LOGIN_FAILED') {
          return this.$message.error('用户不存在')
        }
        if (res.error === 'USER_HAS_BEEN_DISABLED') {
          return this.$message.error('用户已被禁用，请联系管理员启用')
        }
        if (res.error === 'WRONG_PASSWORD') {
          return this.$message.error('账号或密码错误')
        }
      }

      setTimeout(() => {
        this.$router.push(this.$route.query.from ? this.$route.query.from : {name: 'dashboard'})
      }, 500)
    }
  }
}
</script>

<style lang="less">
#page-login {
  height: 100%;
  .form-control {
    height: 48px;
  }
  button[type='submit'] {}
}
</style>
