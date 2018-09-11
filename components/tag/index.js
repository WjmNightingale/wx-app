// components/tag/index.js
Component({
  options: {
    // 启用多插槽
    multipleSlots: true,
  },
  // 外部样式
  externalClasses: ['tag-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    comment: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      this.triggerEvent('tapping', {
        comment: this.properties.comment
      })
    }
  }
})