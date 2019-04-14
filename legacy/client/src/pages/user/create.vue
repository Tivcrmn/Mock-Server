<template>
  <div id="page-organization-detail" class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox-content m-b-sm border-bottom">
      <div>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label class="control-label">用户名称 <span class="redMust">*</span></label>
              <input type="text" v-model="datas.loginName" placeholder="用户名称" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label class="control-label">密码 <span class="redMust">*</span></label>
              <input type="text" v-model="datas.password" placeholder="密码" class="form-control">
            </div>
          </div>
        </div>
        <div class="row" v-if="user.isAdmin">
          <div class="col-sm-4">
            <div class="form-group">
              <el-radio-group v-model="radio">
                <el-radio :label="1">建立管理员</el-radio>
                <el-radio :label="2">普通用户</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="row" v-show="radio === 2">
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
import {
 Radio,
 RadioGroup
} from 'element-ui'
export default {
  name: 'UserCreate',
  data () {
    return {
      datas: {
        loginName: '',
        password: '',
        tenant: ''
      },
      radio: 1
    }
  },
  components: {
    ElRadio: Radio,
    ElRadioGroup: RadioGroup
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
  computed: {
    user () {
      return this.$store.state.user.account
    }
  },
  methods: {
    ...mapActions(['USER_SAVE']),
    validate () {
      if (!this.datas.loginName) {
        this.$message.info('请输入用户名')
        return false
      }
      if (!this.datas.password) {
        this.$message.info('请输入密码')
        return false
      }
      if (this.radio === 2 && !this.datas.tenant) {
        this.$message.info('请输入所属租户')
        return false
      }
      return true
    },
    async save () {
      if (this.validate()) {
        let res = await this.USER_SAVE(this.datas)
        if (res.error === 'USER_EXISTS') {
          this.$message.info('用户已存在')
          return
        }
        if (res.error === 'TENANT_DONT_EXISTS') {
          this.$message.info('租户不存在')
          return
        }
        if (res.success) {
          this.$message.info('添加成功')
        }
        this.$router.push({
          name: 'user_list'
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
