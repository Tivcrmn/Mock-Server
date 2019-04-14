<template>
  <div id="page-organization-detail" class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox-content m-b-sm border-bottom">
      <h2><el-button type="primary" size="small" @click="edit"><i class="el-icon-edit"></i> 编辑</el-button></h2>
      <div v-if="loading">加载中...</div>
      <div v-if="!loading && datas">
        <div v-if="!isEdit">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">用户名称 </label>
                <span>{{datas.loginName}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">所属租户 </label>
                <span>{{datas.tenant}}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isEdit">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">用户名称 </label>
                <input type="text" v-model="cloneData.loginName" placeholder="用户名称" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">密码 </label>
                <input type="text" v-model="cloneData.password" placeholder="密码" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="save">
                  <i class="el-icon-check"></i> 保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</div>
</template>

<script>
import {isEqual, cloneDeep} from 'lodash'
import {mapActions} from 'vuex'
export default {
  name: 'UserDetail',
  data () {
    return {
      datas: null,
      isEdit: false,
      loading: false,
      cloneData: null
    }
  },
  created () {
    this.$nextTick(() => {})
    this.fetch()
  },
  computed: {
    user () {
      return this.$store.state.user.account
    }
  },
  methods: {
    ...mapActions(['USER_DETAIL', 'USER_DETAIL_SAVE']),
    edit () {
      this.isEdit = true
    },
    async fetch () {
      this.loading = true
      let res = await this.USER_DETAIL(this.$route.params.id)
      this.$log(res)
      if (res.success) {
        this.datas = res.data
        this.cloneData = cloneDeep(this.datas)
        this.cloneData.password = ''
        this.loading = false
      }
    },
    validate () {
      if (isEqual(this.cloneData, this.datas)) {
        this.$message.info('信息未改变')
        return false
      }
      if (!this.datas.loginName) {
        this.$message.info('请输入租户名')
        return false
      }
      if (!this.datas.tenant) {
        this.$message.info('请输入所属租户')
        return false
      }
      return true
    },
    save () {
      if (this.validate()) {
        this.USER_DETAIL_SAVE(this.cloneData)
        this.$router.push({
          name: 'user_list'
        })
      }
    }
  }
}
</script>

<style lang="less">
</style>
