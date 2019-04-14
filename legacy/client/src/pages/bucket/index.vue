<template>
  <!-- animated fadeInRight ecommerce -->
  <div id="page-organization-list" class="wrapper wrapper-content">
    <div class="ibox-content m-b-sm border-bottom">

      <div class="row">
        <div class="col-lg-4">
          <div class="form-group">
            <label class="control-label">系统名称</label>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="输入系统名称"
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
              <el-select v-model="searchDatas.somerule" placeholder="请选择" @change="search">
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
                <el-button type="light" @click="create">新建系统</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading">加载中...</div>
      <div v-else id="bucket-list">
          <el-col :span="4" v-for="(o, index) in cloneDatas" :offset="1" :key="o.name">
            <el-card :body-style="{ padding: '0px'}">
              <router-link :to="{path:'/api',query: {bucket: o.name, tenant: o.tenant}}"  ><img src="../../assets/imgs/system.jpg" class="image"></router-link>
              <div style="padding: 14px;">
                <span>{{o.name}}&nbsp&nbsp{{o.tenant}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{o.createTime}}</time>
                  <el-button type="text" class="button red" @click="remove(o)">删除</el-button>
                  <el-button type="text" class="button [o.disabled ? gray : green]" @click="stop(o)">{{DISABLED[o.active]}}&nbsp&nbsp</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
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
  Button,
  Card,
  Col
} from 'element-ui'
export default {
  name: 'BucketIndex',
  data () {
    return {
      SOME_RULE,
      DISABLED,
      loading: false,
      searchDatas: {
        name: '',
        somerule: ''
      },
      cloneDatas: null,
      activeClass: 'gray',
      disableClass: 'green'
    }
  },
  components: {
    ElInput: Input,
    ElButton: Button,
    ElCard: Card,
    ElCol: Col
  },
  created () {
    this.fetch()
  },
  computed: {
    table () {
      return this.$store.state.bucket.list
    }
  },
  methods: {
    ...mapActions(['BUCKET_LIST', 'BUCKET_DELETE', 'BUCKET_POWER']),
    search () {
      this.fetch()
    },
    reset () {
      this.searchDatas.name = ''
      this.searchDatas.somerule = ''
    },
    create () {
      this.$router.push({name: `bucket_create`})
    },
    fetch () {
      this.loading = true
      this.$store.dispatch('BUCKET_LIST', this.searchDatas)
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
        item.active = item.disabled ? '是' : '否'
      })
    },
    stop (o) {
      let str = o.disabled === '是' ? '启用' : '停用'
      this.$confirm(`确定要${str} ”${o.name}” ？`, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('BUCKET_POWER', {disabled: o.disabled, id: o._id})
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
    remove (o) {
      this.$confirm(`确定要删除 ”${o.name}” ？`, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('BUCKET_DELETE', o._id)
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
#bucket-list {
  .el-card {
    margin-top: 40px;
    .time {
      font-size: 13px;
      color: #999;
    }
    
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0px;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
    .red {
      color: #FF4949;
    }
    .gray {
      color: #475669;
    }
    .green {
      color: #13CE66;
    }
  }
}
  
</style>
