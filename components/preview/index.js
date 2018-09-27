// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer: function (newVal, oldVal, path) {
        if (newVal) {
          var typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          } [newVal.type]
        }
        this.setData({
          typeText: typeText
        })
      }
    },
    ableClick: {
      // like组件是否可以点击
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: {
      type: String
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      // bindtap 冒泡
      // catchtap 不冒泡
      console.log('触发一个tap事件')
      this.triggerEvent('tap', {
        cid: this.properties.classic.id,
        type: this.properties.classic.type
      }, {})
    }
  }
})