// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: "../../images/my/my@bg.png",
    aboutImg: "../../images/my/about.png",
    myImg: "../../images/my/my.png",
    authorized: false,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    // 原来获取用户信息的API
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
  },
  userAuthorized() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          // 用户授权了，那么wx.getUserInfo就能获取用户信息
          console.log('用户授权了')
          wx.getUserInfo({
            success: (res) => {
              console.log('用户授权了---')
              console.log(res)
              const userInfo = res.userInfo
              this.setData({
                userInfo,
                authorized: true
              })
            }
          })
        } else {
          console.log('用户未授权')
          this.setData({
            authorized: false
          })
        }
      }
    })
  },
  onGetUserInfo(event) {
    // 弹窗
    // 是否授权
    // API
    // button 组件 UI 让用户主动点击button
    // wx.getUserInfo() API接口
    // console.log(event.detail)
    console.log('接收自定义事件')
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
    // console.log(this.data.userInfo)
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