// 小程序组件行为 类比 vue 的 mixin
const paginationBehavior = Behavior({
  data: {
    books: [],
    total: null
  },
  methods: {
    setMoreData(books) {
      const tmpBooks = this.data.books.concat(books)
      this.setData({
        books: tmpBooks
      })
    },
    getCurrentStart() {
      // 获取下次请求的数据的开始标志位
      return this.data.books.length
    },
    setTotal(total) {
      this.data.total = total
    },
    hasMore(total) {
      // 服务器返回一个 total 标识，判断 this.books.length > total 缺陷--服务器没提供这个标识
      // 判断setMoreData 中的 books 是否为空 缺陷--服务器异常返回空数组
      return this.data.books.length < total ? true : false
    },
    initData() {
      // 重置数据
      this.setData({
        books: [],
        total: null
      })
    }
  }
})

export {
  paginationBehavior
}