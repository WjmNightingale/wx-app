// components/classic/music/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicImgSrc: {
      type: String
    },
    musicContent: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playImg: 'img/player@playing.png',
    pauseImg: 'img/player@waiting.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})