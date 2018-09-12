// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchIcon: 'img/search.png',
    cancelIcon: 'img/cancel.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e) {
      this.triggerEvent('cancel')
    }
  }
})