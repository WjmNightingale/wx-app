import {
  HTTP as HTTP_P
} from '../util/http-p.js'
class KeywordModel extends HTTP_P {
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.indexOf(keyword) > -1 ? true : false
    if (!has) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export {
  KeywordModel
}