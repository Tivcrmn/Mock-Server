<template>
  <el-upload
    class="nb-upload"
    :class="klass"
    :action="api"
    :data="postParams"
    :list-type="listType"
    :before-upload="beforeUpload"
    :on-preview="preview"
    :on-remove="onRemove"
    :on-error="error"
    :on-change="onChange"
    :on-progress="progress"
    :on-success="onSuccess"
    :file-list="fileList">
    <button class="btn btn-outline btn-sm btn-default" type="button">
      <i class="fa fa-upload"></i> {{btnName}}
    </button>
    <div slot="tip" class="el-upload__tip">{{tips}}</div>
  </el-upload>
</template>

<script>
import {Upload} from 'element-ui'
import {remove, each, cloneDeep} from 'lodash'
export default {
  name: 'fileUpload',
  props: {
    klass: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'text'
    },
    fileName: {
      type: String,
      default: 'file'
    },
    btnName: {
      type: String,
      default: '添加附件'
    },
    tips: {
      type: String,
      default: '上传文件不能超过10MB'
    },
    uniq: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: '/api/v1/insurance/file/upload'
    },
    // 允许上传的数量
    number: {
      type: Number,
      default: 0
    },
    // 允许上传文件大小(单位：MB)
    size: {
      type: Number,
      default: 10
    },
    accept: {
      type: String,
      default: null
    },
    postParams: {
      type: Object,
      default: function () {
        return {moduleName: 'contract'}
      }
    },
    fileList: {
      type: Array,
      default: function () {
        return [
          /* {name: '', url: ''} */
        ]
      }
    },
    before: {
      type: Function,
      default: function () {}
    },
    error: {
      type: Function,
      default: function () {}
    },
    remove: {
      type: Function,
      default: function () {}
    },
    preview: {
      type: Function,
      default: function () {}
    },
    change: {
      type: Function,
      default: function () {}
    },
    progress: {
      type: Function,
      default: function () {}
    },
    success: {
      type: Function,
      default: function () {}
    }
  },
  data () {
    return {
      currentFileList: []
    }
  },
  components: {
    ElUpload: Upload
  },
  updated () {
    if (this.fileList.length) {
      // 针对初始化数据中fileList里没有uid的file自动生成uid
      each(this.fileList, file => {
        if (!file.uid) {
          file.uid = 'uid-' + Date.now()
        }
      })
    }
    this.currentFileList = cloneDeep(this.fileList)
  },
  created () {},
  methods: {
    onChange (file, fileList) {
      this.change(file, fileList)
    },
    beforeUpload (file) {
      // check number
      if (!this.checkNumber(file)) {
        this.$message.warning(`最多只能上传${this.number}个`)
        return false
      }

      // check ext
      if (!this.checkExt(file)) {
        this.$message.warning('上传文件格式错误')
        return false
      }

      // uniq
      if (!this.checkSameName(file)) {
        this.$message.warning('上传文件重复')
        return false
      }

      // check size
      if (!this.checkSize(file)) {
        this.$message.warning(`文件大小不能超过${this.size}MB`)
        return false
      }

      this.before(file)
      this.currentFileList.push(file)
      return true
    },
    onRemove (file, fileList) {
      if (!file) return
      this.remove(file, fileList)
      // 清除删掉的文件
      remove(this.fileList, r => r.uid === file.uid)
      remove(this.currentFileList, r => r.uid === file.uid)
    },
    onSuccess (res, file, fileList) {
      // this.fileList = [...this.currentFileList, ]
      this.success(res, file, fileList)
    },
    checkNumber (file) {
      if (this.number === 0) {
        return true
      }
      return this.currentFileList.length < this.number
    },
    checkSameName (file) {
      let same = this.currentFileList.filter(r => r.name === file.name)
      return !same.length
    },
    checkExt (file) {
      // 默认不限
      if (!this.accept) return true
      let accept = this.accept.toUpperCase()
      // 只限JPG
      if (accept === 'JPG') {
        return file.type === 'image/jpeg'
      }
      if (accept === 'IMG') {
        return file.type.indexOf('image/') > -1
      }
      if (accept === 'PDF') {
        return file.type === 'application/pdf'
      }
      if (accept === 'ZIP') {
        return file.type === 'application/zip'
      }
      if (accept === 'EXCEL') {
        return file.name.indexOf('.xls') > -1 || file.name.indexOf('.xlsx') > -1
      }
      if (accept === 'WORD') {
        return file.name.indexOf('.doc') > -1 || file.name.indexOf('.docx') > -1
      }
    },
    checkSize (file) {
      return file.size / 1024 / 1024 <= this.size
    }
  }
}
</script>
