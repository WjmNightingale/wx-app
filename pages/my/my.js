// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: "../../images/my/my@bg.png",
    aboutImg: "../../images/my/about.png",
    myImg: "../../images/my/my.png",
    likeImg: "../../images/my/like.png",
    authorized: false,
    userInfo: null,
    classics: [],
    myBooksCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.userAuthorized()
    // this.getMyBookCount()
    // this.getMyFavor()
  },

  userAuthorized() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          // 用户授权了，那么wx.getUserInfo就能获取用户信息
          wx.getUserInfo({
            success: (res) => {
              const userInfo = res.userInfo
              this.setData({
                userInfo,
                authorized: true
              })
            }
          })
        } else {
          // 用户未授权
          this.setData({
            authorized: false
          })
        }
      }
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        myBooksCount: res.count
      })
    })
  },

  getMyFavor() {
    classicModel.getMyFavor(data => {
      this.setData({
        classics: data
      })
    })
  },

  onGetUserInfo(event) {
    // 弹窗
    // 是否授权
    // API
    // button 组件 UI 让用户主动点击button
    // wx.getUserInfo() API接口
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onPreviewTap(event) {
    // 跳转 参考微信小程序路由
    console.log('准备路由跳转')
    wx.navigateTo({
      url: '/pages/classic-detail/classic-detail?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },

  onJumpToAbout() {
    // 跳转关于页面
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
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
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