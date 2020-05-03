export interface IdleDeadline {
  didTimeout: boolean

  timeRemaining(): number
}

export interface IdleTask {
  id: number
  callback: (deadline: IdleDeadline) => any
  canceled: boolean
  done: boolean
}

export interface RICOptions {
  timeout?: number
}
