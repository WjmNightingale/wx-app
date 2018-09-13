// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    books: []
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
      bookModel.searchBookByQuery(query, 0).then(res => {
        if (res.books) {
          this.setData({
            books: res.books
          })
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