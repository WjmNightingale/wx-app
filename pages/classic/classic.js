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
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // GET  http://bl.7yue.pro/v1/classic/latest?appkey=AmYiUAfV5l88OjyM
    // 数据更新-callBack
    // classicModel.getLatest((res) => {
    //   this.setData({
    //     classic: res,
    //     likeCount: res.fav_nums,
    //     likeStatus: !!res.like_status
    //   })
    // })
    // 数据更新-promise
    classicModel.pGetLatest().then((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: !!res.like_status
      })
    })
  },
  // 点赞操作
  onLike: function (event) {
    // console.log(event)
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
    // 数据更新 -- callback

    // classicModel.getClassic(index, nextOrPrevious, (res) => {
    //   this._getLikeStatus(res.id, res.type)
    //   let isFirst = classicModel.isFirst(res.index)
    //   let isLatest = classicModel.isLatest(res.index)
    //   this.setData({
    //     classic: res,
    //     first: isFirst,
    //     latest: isLatest
    //   })
    // })

    // 数据更新 -- promise
    classicModel.pGetClassic(index, nextOrPrevious).then((res) => {
      this._getLikeStatus(res.id, res.type)
      let isFirst = classicModel.isFirst(res.index)
      let isLatest = classicModel.isLatest(res.index)
      this.setData({
        classic: res,
        first: isFirst,
        latest: isLatest
      })
    })
  },
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      // console.log('喜欢的状态--')
      // console.log(res)
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: !!res.like_status
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