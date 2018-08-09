// components/classic/music/index.js
import {
  classicBehavior
} from '../classic-behavior.js'

// 背景音乐播放管理对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    audioSrc: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagImg: 'img/music@tag.png',
    playImg: 'img/player@playing.png',
    pauseImg: 'img/player@waiting.png',
    isPlay: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (this.properties.isPlay) {
        mMgr.pause()
        this.setData({
          isPlay: false
        })
      } else {
        mMgr.src = this.properties.audioSrc
        this.setData({
          isPlay: true
        })
      }
    }
  }
})