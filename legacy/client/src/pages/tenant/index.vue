<template>
  <!-- animated fadeInRight ecommerce -->
  <div id="page-organization-list" class="wrapper wrapper-content">
    <h1 v-if="!admin"><img src="../../assets/imgs/permisson.png"></h1>
    <div class="ibox-content m-b-sm border-bottom" v-else>

      <div class="row">
        <div class="col-lg-4">
          <div class="form-group">
            <label class="control-label">租户名称</label>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="输入租户名称"
                      v-focus
                      v-model="searchDatas.name">
              <span class="input-group-btn">
                <button class="btn btn-primary" @click.prevent="search">
                  <i class="fa fa-search"></i> 搜索
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label class="control-label">按某种规则</label>
            <div class="input-group">
              <el-select v-model="searchDatas.somerule" placeholder="请选择" @change="searchByState">
                <el-option
                  v-for="(item, key) in SOME_RULE"
                  :key="key"
                  :label="item"
                  :value="key">
                </el-option>
              </el-select>
              <el-button style="margin-left: 20px" type="white" @click.prevent="reset()">重置</el-button>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group align-right" style="margin-top:23px;">
            <div class="row">
              <div class="col-md-6"></div>
              <div class="col-md-6">
                <el-button type="light" @click="create">新建租户</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading">加载中...</div>
      <div v-else>
        <el-table
          :data="cloneDatas"
          border
          style="width: 100%">
          <el-table-column prop="name" label="租户名称" width="200">
            <template slot-scope="scope">
              <a @click="go_detail(scope.row)">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column  prop="adminName" label="管理员" align="center"></el-table-column>
          <el-table-column  prop="disabled" label="是否禁用" align="center"></el-table-column>
          <el-table-column  prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
          <el-table-column
              label="操作"
              align="center"
              width="150">
              <template slot-scope="scope">
                <el-button @click="stop(scope.row)" type="text" size="small">{{DISABLED[scope.row.disabled]}}</el-button>
                <el-button type="text" size="small" style="color: red; margin-left: 20px"
                  @click="remove(scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>  
    </div>
  </div>
</template>

<script>
import {SOME_RULE, DISABLED} from '@/common/const'
import {mapActions} from 'vuex'
import moment from 'moment'
import {each, cloneDeep} from 'lodash'
import {
  Input,
  Button
} from 'element-ui'
export default {
  name: 'TenantIndex',
  data () {
    return {
      SOME_RULE,
      DISABLED,
      loading: false,
      searchDatas: {
        name: ''
      },
      cloneDatas: null,
      admin: false
    }
  },
  components: {
    ElInput: Input,
    ElButton: Button
  },
  created () {
    this.fetch()
  },
  computed: {
    table () {
      return this.$store.state.tenant.list
    },
    user () {
      return this.$store.state.user.account
    }
  },
  methods: {
    ...mapActions(['TENANT_LIST', 'TENANT_DELETE', 'TENANT_POWER']),
    search () {
      this.fetch()
    },
    searchByState () {},
    reset () {
      this.searchDatas.name = ''
      this.searchDatas.somerule = ''
    },
    go_detail (row) {
      this.$router.push({
        name: 'tenant_detail',
        params: {
          id: row._id
        }
      })
    },
    create () {
      this.$router.push({name: `tenant_create`})
    },
    fetch () {
      this.loading = true
      this.admin = this.user.isAdmin
      this.$store.dispatch('TENANT_LIST', this.searchDatas)
        .then(res => {
          if (res.success) {
            this.cloneDatas = cloneDeep(this.table)
            this.parseData(this.cloneDatas)
            this.loading = false
          }
        })
        .catch(() => {})
    },
    parseData (datas) {
      each(datas, item => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD')
        item.updateTime = moment(item.updateTime).format('YYYY-MM-DD')
        item.disabled = item.disabled ? '是' : '否'
      })
    },
    stop (row) {
      let str = row.disabled === '是' ? '启用' : '停用'
      this.$confirm(`确定要${str} ”${row.name}” ？`, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        row.disabled = row.disabled === '是'
        this.$store.dispatch('TENANT_POWER', row._id)
          .then(res => {
            if (res.success) {
              this.$resetPage(this.table)
              this.fetch()
              this.$message.success(`${str}成功`)
            } else {
              this.$resetPage(this.table)
              this.fetch()
              this.$message.error(res.error || `操作失败`)
            }
          })
      })
      .catch(() => {})
    },
    remove (row) {
      this.$confirm(`确定要删除 ”${row.name}” ？`, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('TENANT_DELETE', row._id)
          .then(res => {
            if (res.success) {
              this.$resetPage(this.table)
              this.fetch()
              this.$message.success(`删除成功`)
            } else {
              this.$resetPage(this.table)
              this.fetch()
              this.$message.error(res.error || `操作失败`)
            }
          })
      })
      .catch(() => {})
    }
  }
}
</script>

<style lang="less">
</style>
