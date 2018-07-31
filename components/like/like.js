// components/like/like.js
Component({
  /**
   * 组件的属性列表 -- 外界传入
   */
  properties: {
    isLike: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据 -- 内部私有
   */
  data: {
    likeSrc: 'img/like.png',
    disLikeSrc: 'img/disLike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      this.properties.isLike = !this.properties.isLike
      let count = this.properties.count
      count = this.properties.isLike ? count + 1 : count - 1
      this.setData({
        like: this.properties.isLike,
        count: count
      })
    }
  }
})
