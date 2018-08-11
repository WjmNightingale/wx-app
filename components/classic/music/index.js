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
    // 点击播放
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
    },
    // 检查音乐播放器状态
    _recoverStatus() {
      if (!mMgr.paused && mMgr.src === this.properties.audioSrc) {
        // 当前组件的音乐正在播放
        this.setData({
          isPlay: true
        })
      } else {
        this.setData({
          isPlay: false
        })
      }
    },
    // 监听背景音乐总开关事件
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  },
  // 组件生命周期
  attached() {
    // 在组件实例进入页面节点树时执行
    console.log('音乐组件start')
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached() {
    console.log('音乐组件注销')
    // 在组件实例被从页面节点树移除时执行
  }
})