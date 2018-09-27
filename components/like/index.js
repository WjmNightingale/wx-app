// components/like/like.js
Component({
  /**
   * 组件的属性列表 -- 外界传入
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    },
    ableClick: {
      type: Number,
      value: true
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
      if (this.properties.ableClick) {
        let like = this.properties.like
        let count = this.properties.count
        count = like ? count - 1 : count + 1
        this.setData({
          like: !like,
          count: count
        })
        // 激活 自定义事件
        let behavior = this.properties.like ? 'like' : 'cancel'
        this.triggerEvent('like', {
          behavior
        })
      } else {
        console.log('阻止了点击操作')
      }
    }
  }
})