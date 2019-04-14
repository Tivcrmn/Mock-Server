<template>
  <div id="page-404">

    <div class="middle-box text-center full-width loginscreen animated fadeInDown">
      <div>
        <h3 style="margin-top:10%;margin-bottom:50px;">
          <img src="../assets/imgs/logo.png">
        </h3>
        <h2 class="main-title">您访问的页面找不到</h2>
        <h4 class="pt20 text-primary"><small>{{second}}秒后自动返回首页</small></h4>
        <div class="align-center">
          <a href="" @click.prevent="home">返回首页</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      second: 5
    }
  },
  created () {
    let counter = setInterval(() => {
      this.second--
      if (this.second === 1) {
        clearInterval(counter)
        this.home()
      }
    }, 1000)
  },
  methods: {
    home () {
      this.$router.push({
        name: 'dashboard'
      })
    }
  }
}
</script>

<style lang="less">
#page-404 {
  height: 100%;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow: auto;
  h2.main-title {
    color: #bbb;
    padding-top: 60px;
  }
  h3 {
    img {
      width: 100%;
    }
  }
  h4 {
    small {
      color: #999;
    }
  }
}
</style>
