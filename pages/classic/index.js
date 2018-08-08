// pages/classic/index.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from "../../models/like.js";
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认值
    classic: null,
    first: false,
    latest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // GET  http://bl.7yue.pro/v1/classic/latest?appkey=AmYiUAfV5l88OjyM
    classicModel.getLatest((data) => {
      // 数据更新
      this.setData({
        classic: data
      })
      // latestClassic latestIndex currentClassic currentIndex
    })
  },
  // 点赞操作
  onLike: function (event) {
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext() {
    this._updateClassic('next')
  },
  onPrevious() {
    this._updateClassic('previous')
  },
  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (data) => {
      let isFirst = classicModel.isFirst(data.index)
      let isLatest = classicModel.isLatest(data.index)
      this.setData({
        classic: data,
        first: isFirst,
        latest: isLatest
      })
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

  }
})