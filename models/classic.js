import {
  HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        // console.log(res.data)
        sCallback(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }

  // getPrevious(index, sCallback) {
  //   this.request({
  //     url: `classic/${index}/previous`,
  //     success: (res) => {
  //       sCallback(res)
  //     }
  //   })
  // }

  // getNext(index, sCallback) {
  //   this.request({
  //     url: `classic/${index}/next`,
  //     success: (res) => {
  //       sCallback(res)
  //     }
  //   })
  // }

  getClassic(index, nextOrPrevious, sCallback) {
    // 缓存机制 有缓存，用缓存数据，没缓存，API获取数据
    // 确定缓存的key值
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      // 取缓存值
      sCallback(classic)
    }
  }

  getClassicById(cid, type, success) {
    let params = {
      url: 'classic/' + type + '/' + cid,
      success: success
    }
    this.request(params)
  }

  getMyFavor(success) {
    let params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
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

  _getKey(index) {
    return `classic-${index}`
  }
}

export {
  ClassicModel
}