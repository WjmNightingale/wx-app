import {
  HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        // console.log(res.data)
        sCallback(res.data)
      }
    })
  }
}

export {
  ClassicModel
}