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
                <label class="control-label">租户名称</label>
                <span>{{cloneData.name}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">管理人员</label>
                  <span>{{cloneData.adminName}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">租户成员</label>
                  <span>{{member}}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isEdit">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">租户名称</label>
                <input type="text" v-model="datas.name" placeholder="租户名称" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">管理人员</label>
                <input type="text" v-model="datas.adminName" placeholder="管理人员" class="form-control">
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
  name: 'TenantDetail',
  data () {
    return {
      datas: null,
      isEdit: false,
      loading: false,
      cloneData: null,
      member: ''
    }
  },
  created () {
    this.$nextTick(() => {})
    this.fetch()
  },
  methods: {
    ...mapActions(['TENANT_DETAIL', 'TENANT_DETAIL_SAVE']),
    edit () {
      this.isEdit = true
    },
    async fetch () {
      this.loading = true
      let res = await this.TENANT_DETAIL(this.$route.params.id)
      if (res.success) {
        this.datas = res.data
        for (var i = 0; i < this.datas.member.length; i++) {
          this.member += (this.datas.member[i].loginName + ' ')
        }
        this.cloneData = cloneDeep(this.datas)
        this.loading = false
      }
    },
    validate () {
      console.log('sadasdasdasdasdasdsa')
      if (isEqual(this.cloneData, this.datas)) {
        this.$message.info('信息未改变')
        return false
      }
      if (!this.datas.name) {
        this.$message.info('请输入租户名')
        return false
      }
      if (!this.datas.adminId) {
        this.$message.info('请输入管理员')
        return false
      }
      return true
    },
    async save () {
      if (this.validate()) {
        let res = await this.TENANT_DETAIL_SAVE(this.datas)
        if (res.error === 'TENANT_EXISTS') {
          this.$message.info('租户已存在')
          return
        }
        if (res.error === 'USER_DONT_EXIST') {
          this.$message.info('管理人员不存在或不合法')
          return
        }
        if (res.success) {
          this.$message.info('添加成功')
        }
        this.$router.push({
          name: 'tenant_list'
        })
      }
    }
  }
}
</script>

<style lang="less">
</style>
