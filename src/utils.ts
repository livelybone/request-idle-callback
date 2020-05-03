import { IdleDeadline, IdleTask } from './type'

let $id = 0

export function createIdleTask(callback: IdleTask['callback']): IdleTask {
  return {
    id: ++$id,
    canceled: false,
    done: false,
    callback: (deadline: IdleDeadline) => {
      try {
        callback(deadline)
      } catch (e) {
        // prettier-ignore
        setTimeout(() => { throw e }, 0)
      }
    },
  }
}
