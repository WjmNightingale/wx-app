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
    showSearch: false,
    historyWords: [],
    hotWords: [],
    loading: false,
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e) {
      this.triggerEvent('cancel')
    },
    onSearch(e) {
      // 清空上一次的搜索数据
      this.initData()
      const query = e.detail.value || e.detail.text
      if (!query.trim()) {
        return
      }
      this._showResult(query)
      this._showLoadingCenter()
      bookModel.searchBookByQuery(query, this.getCurrentStart()).then(res => {
        this._hideLoadingCenter()
        if (res.books) {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(query)
        }
      })
    },
    onClear(e) {
      // 清空搜索框关键词以及搜索结果
      this._closeResult()
    },
    loadMore() {
      // 触底加载更多数据
      if (!this.data.query) {
        return
      }
      if (this._isLocked()) {
        // 锁住状态
        return
      }
      // 使用锁的机制，不允许用户同时发起多个请求
      // 加载数据时，使用锁机制避免`searchBookByQuery
      // 在已有的请求未完成时再次调用
      if (this.hasMore(this.data.total)) {
        // 加锁
        this._locked()
        bookModel.searchBookByQuery(this.data.query, this.getCurrentStart()).then((res) => {
          // 用pagination行为方法来更新数据
          this.setMoreData(res.books)
          // 解锁
          this._unLocked()
        }, (error) => {
          // 如果请求出现异常，也要执行解锁操作，避免影响下次请求
          this._unLocked()
          console.log(error)
        })
      }
    },
    _isLocked() {
      return this.data.loading ? true : false
    },
    _locked() {
      this.setData({
        loading: true
      })
    },
    _unLocked() {
      this.setData({
        loading: false
      })
    },
    _showResult(query) {
      this.setData({
        query: query,
        showSearch: true
      })
    },
    _closeResult() {
      this.setData({
        query: '',
        showSearch: false
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
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