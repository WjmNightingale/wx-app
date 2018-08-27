// pages/book/book.js

import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 纯粹的回调函数--callback 
    // 1、陷入回调低于 2、剥夺了函数的return能力
    // Promise 代码风格 多个异步等待合并 不需要层层传递callback
    // async await ES2017 小程序暂不支持
    books: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotBook().then((res) => {
      console.log(res)
      this.setData({
        books: res
      })
    }, (err) => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  test() {
    // Promise 是一个对象 不是函数
    // 对象可以用来保持状态，普通函数不能用来保持状态（闭包函数可以--单例模式）
    const promise = new Promise((resolve, reject) => {
      // pending 进行中
      // fulfilled 已成功 resolve函数将 pending -》fulfilled
      // rejected 已失败 reject函数将 pending -》rejected
      wx.getSystemInfo({
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
    promise.then((res) => {
      // promise 状态为 fulfilled 的回调函数
      console.log(res)
    }, (error) => {
      // promise 状态为 rejected 的回调函数
      console.log(error)
    })
  }
})