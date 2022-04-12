interface Event {
  on(type: string, handler: () => void): void
  emit(type: string, params: any): void
  off(type: string, handler: () => void): void
}

export default class EventEmitter implements Event {
  eventMap: object

  /**
   * eventMap
   * {
   *    type: [...]
   * }
   */
  constructor() {
    this.eventMap = {}
  }

  // on 注册监听器
  on(type: string, handler: (value: any) => void) {
    if (typeof handler !== 'function') {
      throw new Error('handler 必须是函数类型')
    }
    // 如果对应的事件队列不存在，则新建队列
    !this.eventMap[type] && (this.eventMap[type] = [])
    // 将对应的事件和监听函数添加到 eventMap
    this.eventMap[type].push(handler)
  }

  // emit 触发对应监听的事件
  emit(type: string, params: any) {
    if (this.eventMap[type]) {
      this.eventMap[type].forEach((handler: any) => {
        handler(params)
      })
    }
  }

  // off 移除事件监听器
  off(type: string, handler?: (value: any) => void) {
    if (this.eventMap[type]) {
      if (handler) {
        this.eventMap[type] = this.eventMap[type].filter(
          (item: any) => item !== handler
        )
        return
      }
      this.eventMap[type] = undefined
    }
  }
}
