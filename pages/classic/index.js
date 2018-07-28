// pages/classic/index.js
import {
  HTTP
} from '../../util/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(config)
    // GET  http://bl.7yue.pro/v1/classic/latest?appkey=AmYiUAfV5l88OjyM
    var http = new HTTP()
    http.request({
      url: 'classic/latest',
      data: '',
      method: 'GET',
      success: (res) => {
        console.log(res.data)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('请求调用完毕')
      }
    })
    // wx.request({
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
    //   header: {
    //     appkey: 'AmYiUAfV5l88OjyM'
    //   },
    //   success: (res) => {
    //     console.log(res.data)
    //   }
    // })
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

  }
})