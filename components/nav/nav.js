// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      // value: '加载测试'
    },
    first: {
      type: Boolean,
      // value: true
    },
    latest: {
      type: Boolean,
      // value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgLeft: 'img/triangle@left.png',
    disImgLeft: 'img/triangle.dis@left.png',
    imgRight: 'img/triangle@right.png',
    disImgRight: 'img/triangle.dis@right.png'
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