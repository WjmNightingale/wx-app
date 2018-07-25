// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // isLike: {
    //   type: Boolean,
    //   value: false
    // },
    // count: {
    //   type: Number,
    //   value: 99
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: true,
    count: 99,
    likeSrc: 'images/love.png',
    disLikeSrc: 'images/dislove.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      console.log('被点击了')
      this.setData({
        like: !this.data.like
      })
    }
  }
})
