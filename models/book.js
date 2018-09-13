import {
  HTTP as HTTP_P
} from '../util/http-p.js'

class BookModel extends HTTP_P {
  getHotList() {
    return this.request({
      url: '/book/hot_list',
    })
  }
  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
  getDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail`
    })
  }
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }
  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }
  postComment(bid, comment) {
    return this.request({
      method: 'POST',
      url: 'book/add/short_comment',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
  searchBookByQuery(q, start) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q,
        start
      }
    })
  }
}

export {
  BookModel
}