<template>
  <div id="page-organization-detail" class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox-content m-b-sm border-bottom">
        <div>
          <span style="font-size: 15px">基本信息</span>
          <hr>

          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label>API类型: </label>
                <el-select v-model="datas.method" placeholder="请选择">
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
                <el-input placeholder="请输入url" v-model="datas.url">
                  <template slot="prepend">https://example.com/api/{{this.$route.params.tenant}}/{{datas.bucket}}</template>
                </el-input> 
              </div>
            </div>
            
          </div>
          
          <div class="row">
            <div class="col-lg-3">
              <div class="form-group">
                <label>请输入数据条数: </label>
                <el-input v-model="datas.repeat"></el-input>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="form-group">
                <label>version </label>
                <el-input v-model="datas.version"></el-input>
              </div>
            </div>
          </div>
        </div>
        
        
        <div>
          <span style="font-size: 15px">数据选择</span>
          <hr>
          <template v-for="(o, index) in datas.fields">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <el-button type="primary" icon="close" @click="deleteField(index)"></el-button>
                  <input v-model="o.fieldName" placeholder="请输入字段名称" class="sinput"></input>
                  <el-button type="info" @click="openType(index)">{{MOCKTYPE[o.fieldType]}}</el-button>
                  <el-button type="info" v-if="o.fieldType==='object'" @click="setObject(index)">设置{{MOCKTYPE[o.fieldType]}}</el-button>  
                </div>
              </div>
            </div>
          </template>
        </div>
        
          

        
        <div>
          <span style="font-size: 15px">query数据</span>
          <hr>
          <template v-for="(o, index) in datas.query">
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
</template>

<script>
import {MOCKTYPE, API_TYPE, MOCK_EXAMPLE, DATA_TYPE} from '@/common/const'
import {mapActions} from 'vuex'
import {
  Input,
  Option
} from 'element-ui'
export default {
  name: 'ApiCreate',
  data () {
    return {
      datas: {
        method: '',
        url: '',
        bucket: this.$route.params.bucket,
        fields: [{fieldName: '', fieldType: ''}],
        query: [{queryName: '', queryType: 'string'}],
        repeat: 1,
        version: 1
      },
      dialogFormVisible: false,
      MOCKTYPE,
      API_TYPE,
      MOCK_EXAMPLE,
      DATA_TYPE,
      index: 1
    }
  },
  components: {
    ElInput: Input,
    ElOption: Option
  },
  created () {
    window.api = this
    this.$nextTick(() => {
      this.$store.commit('LAYOUT', {
        breadcrumb: {
          fixed: false,
          list: [
            {
              name: 'API管理',
              link: '/api'
            },
            {
              name: '新建API'
            }
          ]
        }
      })
    })
  },

  methods: {
    ...mapActions(['API_SAVE']),
    addField () {
      this.datas.fields.push({fieldName: '', fieldType: ''})
    },
    addQuery () {
      this.datas.query.push({queryName: '', queryType: 'string'})
    },
    deleteField (index) {
      this.datas.fields.splice(index, 1)
    },
    deleteQuery (index) {
      this.datas.query.splice(index, 1)
    },
    openType (index) {
      this.index = index
      this.dialogFormVisible = true
    },
    chooseType (o) {
      this.datas.fields[this.index].fieldType = o[0]
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
      if (!this.datas.method) {
        this.$message.info('请输入API方法')
        return false
      }
      if (!this.datas.url) {
        this.$message.info('请输入url')
        return false
      }
      if (!this.datas.bucket) {
        this.$message.info('bucket错误，请重新登录')
        return false
      }
      if (!this.datas.repeat) {
        this.$message.info('请输入重复条数')
        return false
      }
      if (!this.datas.version) {
        this.$message.info('请输入该API的版本')
        return false
      }
      if (!this.validateField(this.datas.fields)) {
        this.$message.info('有空置的字段名或字段选项')
        return false
      }
      if (!this.validateQuery(this.datas.query)) {
        this.$message.info('有空置的query名或query选项')
        return false
      }
      return true
    },
    async save () {
      if (this.validate()) {
        let res = await this.API_SAVE(this.datas)
        if (res.error === 'USER_INVALID') {
          this.$message.info('用户非法')
          return
        }
        if (res.error === 'API_EXISTS') {
          this.$message.info('API已存在')
          return
        }
        if (res.success) {
          this.$message.info('添加成功')
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
  .wrapper {
    height: 300px;
    width: 300px;
  }
}
</style>
