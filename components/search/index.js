// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
const keywordModel = new KeywordModel()
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
    historyWords: [],
    hotWords: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e) {
      this.triggerEvent('cancel')
    },
    onConfirm(e) {
      const keyword = e.detail.value.trim()
      if (!keyword) {
        return
      }
      keywordModel.addToHistory(keyword)
      console.log(keywordModel.getHistory())
    },
    onClear(e) {
      // clear
    }
  },
  attached() {
    const historyWords = keywordModel.getHistory()
    this.setData({
      historyWords
    })
    keywordModel.getHot().then(res => {
      console.log(res)
      this.setData({
        hotWords: res.hot
      })
    })
    // console.log('缓存', this.data.historyWords)
  }
})