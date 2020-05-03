interface IdleDeadline {
  didTimeout: boolean

  timeRemaining(): number
}

interface IdleTask {
  id: number
  callback: (deadline: IdleDeadline) => any
  canceled: boolean
  done: boolean
}

interface RICOptions {
  timeout?: number
}

declare function requestIdleCallback(
  callback: IdleTask['callback'],
  options?: RICOptions,
): number

declare function cancelIdleCallback(id: number): void

export {
  IdleDeadline,
  IdleTask,
  RICOptions,
  cancelIdleCallback,
  requestIdleCallback,
}
