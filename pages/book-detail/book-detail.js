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
    wx.showLoading()
    const bid = options.bid
    // bookModel.getDetail(bid).then((res) => {
    //   this.setData({
    //     book: res
    //   })
    // })
    // bookModel.getComments(bid).then((res) => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // bookModel.getLikeStatus(bid).then((res) => {
    //   this.setData({
    //     likeStatus: res.like_status
    //   })
    // })


    // Promise.all() 可以将Promise多个实例合并成一个

    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    // detail comments likeStatus 是三个Promise实例 so 
    // Promise.all 返回一个新的Promise实例 then 只有在先前的 Promise 实例都完成后才能触发回调函数
    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })

    // Promise.race() 任何一个子Promise完成后就触发回调
    // race ==》竞争
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
    const like_status = !this.data.likeStatus
    const like_count = like_or_cancel === 'like' ? this.data.likeCount - 0 + 1 : this.data.likeCount - 0 - 1
    this.setData({
      likeStatus: like_status,
      likeCount: like_count
    })
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