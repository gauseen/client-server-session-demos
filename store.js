// 模拟存储数据库
module.exports = class Store {
  constructor () {
    this.store = {}
  }

  save (key, value) {
    this.store[key] = value
  }

  find (key) {
    return this.store[key]
  }
}
