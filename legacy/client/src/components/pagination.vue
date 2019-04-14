<template>
  <div class="rd-pagination">
    <div class="rd-info" v-if="showInfo"></div>
    <div class="rd-jump" v-if="showJump">
      <input type="text" v-model="pageJump" /><span>search</span>
    </div>
    <ul class="pagination hide-if-no-paging-" v-if="showList && pageList.length > 0">
      <li class="footable-page-arrow" @click="prev" :class="{'disabled': pageStart == 1}" >
        <span class="fa fa-angle-left"></span>
      </li>
      <li class="footable-page" :class="{'active': 1 == pageStart}" @click.prevent="first">
        <a href="#">1</a>
      </li>
      <li class="footable-page pagination-more jump-prev"  v-show="pageLimit.max > 10 && pageStart > 4">
        <span class="fa fa-ellipsis-h"></span>
      </li>
      <li class="footable-page" :class="{'active': el == pageStart}" @click.prevent="pagePath(el)" v-for="el in pageList" v-if="el">
        <a href="#">{{el}}</a>
      </li>
      <li class="footable-page pagination-more" v-show="pageLimit.max > 10 && pageStart <= pageLimit.max - 4">
          <span class="fa fa-ellipsis-h"></span>
      </li>
      <li class="footable-page" @click.prevent="last" :class="{'active': pageLimit.max == pageStart}" >
        <a href="#">{{pageLimit.max}}</a>
      </li>
      <li class="footable-page" @click="next" :class="{'disabled': pageStart == pageLimit.max}" >
        <span class="fa fa-angle-right"></span>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * Pagination页面转跳以及router push部分还需要优化
 * router和pageChange要双向依赖，自动变更状态
 * 暂时的做法是在请求和build params的时候加上特定钩子，有一定的耦合
 * 稍后抽时间去耦合
 */

import {clone, assign} from 'lodash'
import {CF} from '@/common/const'
let optionsDefault = {
  remote: {
    params: {},
    url: '',
    totalName: 'total',
    offset: 0
  },
  showInfo: false,
  showJump: false,
  listNumber: 5
}
export default {
  name: 'VcPagination',
  props: {
    options: Object,
    total: Number,
    pageSize: {
      type: Number,
      default: CF.PAGE_SIZE
    },
    // 翻页时是否不激活$router(即router path不改变，适合弹窗或其他小范围的模块翻页)
    withoutRouter: {
      type: Boolean,
      default: false
    },
    // 重置翻页到第一页
    reset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showJump: false,
      showInfo: false,
      pageJump: '',
      pageList: [1],
      pageStart: 1,
      showList: true,
      activePage: parseInt(this.$route.query.page) || 1,
      pageLimit: {
        min: 1,
        max: 10,
        total: 1
      }
    }
  },
  created () {
    this.buildParams()
  },
  mounted () {
    this.$optionsDefault = {}
    Object.assign(this.$optionsDefault, optionsDefault, this.options)
    if (this.url) {
      this.$optionsDefault.remote.url = this.url
    }
    this.initPageList(this.total, false, this.activePage)
    this.getData(1)
  },
  watch: {
    total (val) {
      if (this.reset) {
        this.initPageList(val, true)
      } else {
        this.initPageList(val)
      }
    }
  },
  methods: {
    buildParams () {
      let p = {
        page: this.$route.query.page,
        size: this.$route.query.size
      }
      if (!p.page) {
        p.page = this.activePage
      }
      if (!p.size) {
        p.size = this.pageSize
      }
      this.$router.push({query: p})
    },
    pagePath (pageNumber) {
      this.pageStart = pageNumber
      this.getData()
    },
    first () {
      if (this.pageStart !== 1) {
        this.pageStart = 1
        this.getData()
      }
    },
    last () {
      if (this.pageStart !== this.pageLimit.max) {
        this.pageStart = this.pageLimit.max
        this.getData()
      }
    },
    prev () {
      if (this.pageStart === 1) {
        return
      }
      this.pageStart > this.pageLimit.min ? this.pageStart-- : this.pageStart = 1
      this.getData()
    },
    next () {
      if (this.pageStart === this.pageLimit.max) {
        return
      }
      this.pageStart < this.pageLimit.max ? this.pageStart++ : this.pageStart = this.max
      this.getData()
    },
    jump (pageNumber) {
      this.pageStart = this.pageStart + pageNumber > 1 ? (this.pageStart + pageNumber) : 1
      if (this.pageStart > this.pageLimit.max) {
        this.pageStart = this.pageLimit.max
      }
      this.getData()
    },
    initPageList (total, reset, activePage) {
      if (reset) {
        this.pageStart = 1
      }
      if (activePage) {
        this.pageStart = activePage
      }
      this.pageLimit.max = Math.ceil(total / this.pageSize)
      this.pageListRefresh()
    },
    getData () {
      let params = {
        'pageIndex': this.pageStart + this.$optionsDefault.remote.offset,
        'pageSize': this.pageSize
      }
      Object.assign(params, this.$optionsDefault.remote.params)
      if (this.INIT) {
        this.changedPage(params)
        this.$emit('change', params)
        this.pageListRefresh()
      }
      this.INIT = true
    },
    changedPage (pa) {
      let query = clone(this.$route.query)
      query.page = pa.pageIndex
      this.$router.push({
        path: this.$route.path,
        query: assign({
          size: this.pageSize
        }, query)
      })
    },
    pageListRefresh () {
      let arr = []
      for (let i = 2; i <= this.pageLimit.max - 1; i++) {
        arr.push(i)
      }
      if (this.pageLimit.max === 2) {
        arr.length = 1
        this.pageList = arr
        return
      }
      if (this.pageLimit.max < 10) {
        this.pageList = arr.slice(0, this.pageLimit.max)
        return
      }
      if (this.pageStart < 4) {
        this.pageList = arr.slice(0, 4)
      } else if (this.pageStart > this.pageLimit.max - optionsDefault.listNumber + 2) {
        this.pageList = arr.slice(-4)
      } else {
        let start = this.pageStart - 2 - Math.floor(optionsDefault.listNumber / 2)
        this.pageList = arr.slice(start, start + optionsDefault.listNumber)
      }
    }
  }
}
</script>
