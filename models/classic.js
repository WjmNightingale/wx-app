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

  pGetLatest() {
    const promise = new Promise((resolve, reject) => {
      this.request({
        url: 'classic/latest',
        success: res => {
          resolve(res)
          this._setLatestIndex(res.index)
          wx.setStorageSync(this._getKey(res.index), res)
        },
        fail: err => reject(err)
      })
    })
    return promise
  }

  getPrevious(index, sCallback) {
    this.request({
      url: `classic/${index}/previous`,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  pGetPrevious(index) {
    const promise = new Promise((resolve, reject) => {
      this.request({
        url: `classic/${index}/previous`,
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
    return promise
  }

  getNext(index, sCallback) {
    this.request({
      url: `classic/${index}/next`,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  pGetNext(index) {
    const promise = new Promise((resolve, reject) => {
      this.request({
        url: `classic/${index}/next`,
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
  }

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

  pGetClassic(index, nextOrPrevious) {
    const promise = new Promise((resolve, reject) => {
      let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
      let classic = wx.getStorageSync(key)
      if (!classic) {
        this.request({
          url: `classic/${index}/${nextOrPrevious}`,
          success: (res) => {
            wx.setStorageSync(this._getKey(res.index), res)
            resolve(res)
          },
          fail: err => reject(err)
        })
      } else {
        // 取缓存值
        resolve(classic)
      }
    })
    return promise
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