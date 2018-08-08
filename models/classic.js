import {
  HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        // console.log(res.data)
        sCallback(res.data)
        this._setLatestIndex(res.data.index)
      }
    })
  }

  getPrevious(index, sCallback) {
    this.request({
      url: `classic/${index}/previous`,
      success: (res) => {
        sCallback(res.data)
      }
    })
  }

  getNext(index, sCallback) {
    this.request({
      url: `classic/${index}/next`,
      success: (res) => {
        sCallback(res.data)
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    this.request({
      url: `classic/${index}/${nextOrPrevious}`,
      success: (res) => {
        sCallback(res.data)
      }
    })
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index === latestIndex ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
}

export {
  ClassicModel
}