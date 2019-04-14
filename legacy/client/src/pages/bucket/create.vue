<template>
  <div id="page-organization-detail" class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox-content m-b-sm border-bottom">
      <div>
        <div class="row" v-if="user.isAdmin">
          <div class="col-sm-4">
            <div class="form-group">
              <label class="control-label">所属租户 <span class="redMust">*</span></label>
              <input type="text" v-model="datas.tenant" placeholder="所属租户" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label class="control-label">系统名称 <span class="redMust">*</span></label>
              <input type="text" v-model="datas.name" placeholder="系统名称" class="form-control">
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
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'BucketCreate',
  data () {
    return {
      datas: {
        name: '',
        tenant: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user.account
    }
  },
  created () {
    this.$nextTick(() => {
      this.$store.commit('LAYOUT', {
        breadcrumb: {
          fixed: false,
          list: [
            {
              name: '系统管理',
              link: '/bucket'
            },
            {
              name: '新建系统'
            }
          ]
        }
      })
    })
  },

  methods: {
    ...mapActions(['BUCKET_SAVE']),
    validate () {
      if (!this.datas.name) {
        this.$message.info('请输入系统名')
        return false
      }
      if (this.user.isAdmin && !this.datas.tenant) {
        this.$message.info('请输入租户名')
        return false
      }
      return true
    },
    async save () {
      if (this.validate()) {
        let res = await this.BUCKET_SAVE(this.datas)
        if (res.error === 'BUCKET_EXISTS') {
          this.$message.info('该系统已存在')
          return
        }
        if (res.error === 'TENANT_DONT_EXISTS') {
          this.$message.info('该租户不存在')
          return
        }
        this.$router.push({
          name: 'bucket_list'
        })
      }
    }
  }
}
</script>

<style lang="less">
#page-organization-detail {
  .redMust {
    color: red;
  }
}
</style>
