// components/image-button/index.js
Component({
  // 启用插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    openType: {
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
    onGetUserInfo(event) {
      console.log('触发一个自定义获取用户信息事件')
      // 自定义事件
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})