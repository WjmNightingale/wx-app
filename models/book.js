import {
  HTTP as HTTP_P
} from '../util/http-p.js'

class BookModel extends HTTP_P {
  getHotBook() {
    return this.request({
      url: '/book/hot_list',
    })
  }
}

export {
  BookModel
}