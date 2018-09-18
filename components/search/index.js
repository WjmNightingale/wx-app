// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBehavior
} from '../../components/behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  behaviors: [paginationBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
      // observer: function (newVal, oldVal, changePath) {
      //   // 监听more属性的变化
      //   console.log('监听到了属性变化')
      //   console.log(newVal)
      // }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchIcon: 'img/search.png',
    cancelIcon: 'img/cancel.png',
    query: '',
    searchIsFinish: false,
    historyWords: [],
    hotWords: [],
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e) {
      this.triggerEvent('cancel')
    },
    onSearch(e) {
      const query = e.detail.value || e.detail.text
      if (!query.trim()) {
        return
      }
      this.setData({
        query: query,
        searchIsFinish: true
      })
      bookModel.searchBookByQuery(query, this.getCurrentStart()).then(res => {
        if (res.books) {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(query)
        }
      })
    },
    onClear(e) {
      // 清空搜索框关键词以及搜索结果
      this.setData({
        query: '',
        searchIsFinish: false
      })
    },
    loadMore() {
      // 加载更多数据
      console.log('加载更多')
      if (!this.data.query) {
        return
      }
      if (this.data.loading) {
        // 锁住状态
        return
      }
      console.log('搜索词存在还为发HTTP请求')
      console.log(this.data.total)
      // 使用锁的机制，不允许用户同时发起多个请求
      // 加载数据时，使用锁机制避免`searchBookByQuery在已有的请求未完成时，再次调用
      console.log(this.hasMore(this.total))
      if (this.hasMore(this.data.total)) {
        console.log('存在更多数据，开始请求')
        // 加锁
        this.data.loading = true
        bookModel.searchBookByQuery(this.data.query, this.getCurrentStart()).then(res => {
          // this.data.books 已有的数据
          // res.books 新请求的数据
          // 用行为方法来更新数据
          this.setMoreData(res.books)
          // 解锁
          this.data.loading = false
          console.log('请求完毕')
        })
      }
    }
  },
  attached() {
    const historyWords = keywordModel.getHistory()
    this.setData({
      historyWords
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  }
})