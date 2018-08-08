import {
  HTTP
} from "../util/http.js"

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {
    // console.log('获取点赞信息')
    // console.log(`classic/${category}/${artID}/favor`)
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: sCallback
    })
  }
}

export {
  LikeModel
}