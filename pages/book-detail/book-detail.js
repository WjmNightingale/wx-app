// pages/book-detail/index.js
import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js';
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
    bookModel.getDetail(bid).then((res) => {
      this.setData({
        book: res
      })
    })
    bookModel.getComments(bid).then((res) => {
      this.setData({
        comments: res.comments
      })
    })
    bookModel.getLikeStatus(bid).then((res) => {
      this.setData({
        likeStatus: res.like_status
      })
    })
  },
  onFakePost(e) {
    this.setData({
      posting: true
    })
  },
  onCancel(e) {
    this.setData({
      posting: false
    })
  },
  onLike(e) {
    const like_or_cancel = e.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onPost(e) {
    // 点击tag组件提交
    const bid = this.data.book.id
    console.log(e.detail)
    const comment = e.detail.comment || e.detail.value
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(bid, comment).then(res => {
      wx.showToast({
        title: '评论+1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
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