<template>
  <div id="page-organization-detail" class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox-content m-b-sm border-bottom">
      <div>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label class="control-label">租户名称 <span class="redMust">*</span></label>
              <input type="text" v-model="datas.name" placeholder="租户名称" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label class="control-label">管理人员 <span class="redMust">*</span></label>
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
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'TenantCreate',
  data () {
    return {
      datas: {
        name: '',
        adminName: ''
      }
    }
  },
  components: {
  },
  created () {
    this.$nextTick(() => {
      this.$store.commit('LAYOUT', {
        breadcrumb: {
          fixed: false,
          list: [
            {
              name: '租户管理',
              link: '/tenant'
            },
            {
              name: '新建租户'
            }
          ]
        }
      })
    })
  },

  methods: {
    ...mapActions(['TENANT_SAVE']),
    validate () {
      if (!this.datas.name) {
        this.$message.info('请输入租户名')
        return false
      }
      if (!this.datas.adminName) {
        this.$message.info('请输入管理员')
        return false
      }
      return true
    },
    async save () {
      if (this.validate()) {
        let res = await this.TENANT_SAVE(this.datas)
        if (res.error === 'TENANT_EXISTS') {
          this.$message.info('租户已存在')
          return
        }
        if (res.error === 'USER_DONT_EXIST') {
          this.$message.info('用户不存在')
          return
        }
        if (res.error === 'USER_INVALID') {
          this.$message.info('用户不合法')
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
#page-organization-detail {
  .redMust {
    color: red;
  }
}
</style>
