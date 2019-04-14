<template>
  <div id="page-organization-detail" class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox-content m-b-sm border-bottom">
      <h2><el-button type="primary" size="small" @click="edit"><i class="el-icon-edit"></i> 编辑</el-button></h2>
      <div v-if="loading">加载中...</div>
      <div v-if="!loading && data">
        <div v-if="!isEdit">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">url</label>
                <span>{{data.url}}</span>
              </div>
            </div>
          </div>
<!--           <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">管理人员</label>
                  <span>{{data.adminId}}</span>
              </div>
            </div>
          </div> -->
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">版本</label>
                  <span>{{data.version}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">所属租户</label>
                  <span>{{data.tenant}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">所属系统</label>
                  <span>{{data.bucket}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label class="control-label">method</label>
                  <span>{{data.method}}</span>
              </div>
            </div>
          </div>

          <span>字段</span>
          <hr>
          <template v-for="(o, index) in data.fields">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <span>{{o.fieldName}}</span>
                  <span>
                    {{MOCKTYPE[o.fieldType]}}
                  </span>
                </div>
              </div>
            </div>
          </template>


          <span>query</span>
          <hr>
          <template v-for="(o, index) in data.query">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <span>{{o.queryName}}</span>
                  <span>{{o.queryType}}</span>
                </div>
              </div>
            </div>
          </template>

        </div>
        <div v-if="isEdit">
      <div>
          <span style="font-size: 15px">基本信息</span>
          <hr>

          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label>API类型: </label>
                <el-select v-model="data.method" placeholder="请选择">
                  <el-option
                    v-for="item in API_TYPE"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <el-input placeholder="请输入url" v-model="data.url">
                  <template slot="prepend">https://example.com/api/{{data.tenant}}/{{data.bucket}}</template>
                </el-input>
              </div>
            </div>
            
          </div>
          
          <div class="row">
            <div class="col-lg-3">
              <div class="form-group">
                <label>请输入数据条数: </label>
                <el-input v-model="data.repeat"></el-input>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="form-group">
                <label>version </label>
                <el-input v-model="data.version"></el-input>
              </div>
            </div>
          </div>
        </div>
        
        
        <div>
          <span style="font-size: 15px">数据选择</span>
          <hr>
          <template v-for="(o, index) in data.fields">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <el-button type="primary" icon="close" @click="deleteField(index)"></el-button>
                  <input v-model="o.fieldName" placeholder="请输入字段名称" class="sinput"></input>
                  <el-button type="info" @click="openType(index)">{{MOCKTYPE[o.fieldType]}}</el-button>

                </div>
              </div>
            </div>
          </template>
        </div>
        
          

        
        <div>
          <span style="font-size: 15px">query数据</span>
          <hr>
          <template v-for="(o, index) in data.query">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <el-button icon="close" @click="deleteQuery(index)"></el-button>
                  <input placeholder="请输入query名称" v-model="o.queryName" class="sinput"></el-input>
                  <el-select v-model="o.queryType" placeholder="请选择">
                    <el-option
                      v-for="item in DATA_TYPE"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>

                </div>
              </div>
            </div>
          </template>
        </div>
          

        

        <div class="row">
          <div class="form-group">
            <div class="col-lg-1">
              <button type="submit" class="btn btn-primary" @click="save">
                <i class="el-icon-check"></i> 保存
              </button>
            </div>
            <div class="col-lg-1">
              <button class="btn btn-info" @click="addField">
                <i class="el-icon-plus"></i> 添加字段
              </button>
            </div>
            <div class="col-lg-1" style="margin-left: 20px">
              <button class="btn btn-info" @click="addQuery">
                <i class="el-icon-plus"></i> 添加query
              </button>
            </div>
          </div>
        </div>

        <!-- Form -->

        <el-dialog title="选择相应的数据类型" :visible.sync="dialogFormVisible">
          <template v-for="o, index in MOCK_EXAMPLE.data">
            <div class="item" @click="chooseType(o)">
              <span>{{o[1]}}</span>
              <p>{{o[2]}}</p>
              <p>{{o[3]}}</p>
              <p>{{o[4]}}</p>
            </div>
          </template>
        </el-dialog>
    </div>

      </div>
    </div>
    
</div>
</template>

<script>
import {MOCKTYPE, API_TYPE, MOCK_EXAMPLE, DATA_TYPE} from '@/common/const'
import {mapActions} from 'vuex'
import {
  Input,
  Option
} from 'element-ui'
export default {
  name: 'ApiDetail',
  data () {
    return {
      data: null,
      loading: false,
      dialogFormVisible: false,
      MOCKTYPE,
      API_TYPE,
      MOCK_EXAMPLE,
      DATA_TYPE,
      index: 1,
      isEdit: false
    }
  },
  created () {
    this.$nextTick(() => {})
    this.fetch()
  },
  components: {
    ElInput: Input,
    ElOption: Option
  },
  methods: {
    ...mapActions(['API_DETAIL', 'API_DETAIL_SAVE']),
    edit () {
      this.isEdit = true
    },
    async fetch () {
      this.loading = true
      let res = await this.API_DETAIL(this.$route.params.id)
      if (res.success) {
        this.data = res.data
        this.loading = false
      }
    },
    addField () {
      this.data.fields.push({fieldName: '', fieldType: ''})
    },
    addQuery () {
      this.data.query.push({queryName: '', queryType: 'string'})
    },
    deleteField (index) {
      this.data.fields.splice(index, 1)
    },
    deleteQuery (index) {
      this.data.query.splice(index, 1)
    },
    openType (index) {
      this.index = index
      this.dialogFormVisible = true
    },
    chooseType (o) {
      this.data.fields[this.index].fieldType = o[0]
      this.dialogFormVisible = false
    },
    validateField (field) {
      for (let i = 0; i < field.length; i++) {
        if (field[i].fieldType && field[i].fieldName) {
          return true
        } else {
          return false
        }
      }
    },
    validateQuery (query) {
      for (let i = 0; i < query.length; i++) {
        if (query[i].queryType && query[i].queryName) {
          return true
        } else {
          return false
        }
      }
    },
    validate () {
      if (!this.data.method) {
        this.$message.info('请输入API方法')
        return false
      }
      if (!this.data.url) {
        this.$message.info('请输入url')
        return false
      }
      if (!this.data.bucket) {
        this.$message.info('bucket错误，请重新登录')
        return false
      }
      if (!this.data.repeat) {
        this.$message.info('请输入重复条数')
        return false
      }
      if (!this.data.version) {
        this.$message.info('请输入该API的版本')
        return false
      }
      if (!this.validateField(this.data.fields)) {
        this.$message.info('有空置的字段名或字段选项')
        return false
      }
      if (!this.validateQuery(this.data.query)) {
        this.$message.info('有空置的query名或query选项')
        return false
      }
      return true
    },
    async save () {
      if (this.validate()) {
        let res = await this.API_DETAIL_SAVE(this.data)
        if (res.error === 'USER_INVALID') {
          this.$message.info('用户非法')
          return
        }
        if (res.error === 'API_EXISTS') {
          this.$message.info('API已存在')
          return
        }
        if (res.success) {
          this.$message.info('修改成功')
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
  .item {
    width: 140px;
    height: 90px;
    background-color: #EDEDED;
    float: left;
    margin: 10px;
    border-radius: 10px;
    &:hover {
      background-color: #DEDEDE;
    }
    > span {
      font-size: 20px;
      font-weight: 40;
    }
    > p {
      margin: 0;
      font-size: 5px;
    }
  }
  .sinput {
    text-align:center;
    font-size:1em;
    height:2.8em;
    border-radius:4px;
    border:1px solid #c8cccf;
    color:#6a6f77;
    text-decoration:none;
    width:50%;
  }
}
</style>
