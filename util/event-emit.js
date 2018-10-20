// 最简单的观察者模式

class Publisher {
  // 存储订阅
  constructor(name) {
    this.name = name
    this.subscribers = {
      'any': []
    }
  }
  // 添加订阅
  subscribe(type = 'any', fn) {
    if (!this.subscribers[type]) {
      this.subscribers[type] = []
    }
    this.subscribers[type].push(fn)
  }
  // 移除订阅
  unsubscribe(type = 'any', fn) {
    // 将退订的方法丛数组中移除
    this.subscribers[type] = this.subscribers[type].filter((item) => {
      return item !== fn
    })
  }
  // 发布订阅
  publish(type = 'any', ...args) {
    this.subscribers[type].forEach((item) => {
      item(...args)
    })
  }
}

class Subscriber {
  constructor(name) {
    this.name = name
  }
  readNews(info) {
    console.log('监听到了Publisher发布的事件' + info)
  }
}

var Jack = new Publisher(Jack)
var Tom = new Subscriber(Tom)
// Tom 订阅 Jack 的报纸
Jack.subscribe('娱乐', Tom.readNews)
Jack.subscribe('体育', Tom.readNews)
// Jack 发布新报纸
Jack.publish('娱乐', 'SHE演唱会')
Jack.publish('体育', 'LOL世界总决赛开幕赛开始')

// 

// var publisher = {
//   subscribers: {
//     'any': []
//   },
//   // 添加订阅者
//   subscribe: function(type = 'any', fn) {
//     if (!this.subscribers[type]) {
//       this.subscribers[type] = []
//     }
//     this.subscribers[type].push(fn)
//   },
//   // 退订
//   unsubscribe: function(type = 'any', fn) {
//     // 将退订的方法丛数组中移除
//     this.subscribers[type] = this.subscribers[type].filter((item) => {
//       return item !== fn
//     })
//   },
//   // 发布订阅
//   publish: function(type = 'any', ...args) {
//     this.subscribers[type].forEach((item) => {
//       item(...args)
//     })
//   }
// }

// var subscriber = {
//   readNews: function(info) {
//     console.log(info)
//   }
// }


// Events 模块的核心实现

class EventEmitter {
  constructor() {
    this._events = {}
    this.defaultMaxListeners = 10
  }
  on(type, listener, flag) {
    this._addListener(type, listener, flag)
  }
  addListener() {
    this._addListener(type, listener, flag)
  }
  emit(type, ...args) {
    // emit方法就是将订阅方法取出执行
    // 使用 call 方法来修正 this 的指向
    // 使其指向子类的实例
    if (this._events[type]) {
      this._events[type].forEach((fn) => {
        fn.call(this, ...args)
      })
    }
  }
  _addListener(type = 'newListener', listener, flag) {
    if (!this._events) {
      // 如果 this._events()为空
      this._events = Object.create(null)
    }
    if (this._events[type]) {
      // 如果 type 类型已经被订阅过
      // 那么就将 监听函数 listener 放进事务中心
      if (flag) {
        this._events[type].unshift(listener)
      } else {
        this._events[type].push(listener)
      }
    } else {
      // 如果 type 类型尚未被订阅过
      // 那么就为该类型创建一个事务中心
      this._events[type] = [listener]
    }
    // 绑定事件，触发 newListener
    if (type !== 'newListener') {
      // 如果 type 不是默认值，那么就调用 this.emit()
      // 执行 type 类型事务中心的监听函数
      this.emit(type)
    }
  }
}