// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 2018,
    month: '三月'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached() {
    console.log(this.data)
  }
})
