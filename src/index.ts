import { listenVisibilityChange } from './doc-visibility-change'
import { createIdleDeadline, runInIdleTimeOfFrame } from './frame'
import { IdleTask, RICOptions } from './type'
import { createIdleTask } from './utils'

export * from './type'

const queue: IdleTask[] = []

export function requestIdleCallback(
  callback: IdleTask['callback'],
  options?: RICOptions,
) {
  const task = createIdleTask(callback)
  queue.push(task)

  if (options && options.timeout && +options.timeout) {
    setTimeout(() => {
      if (!task.done) {
        task.callback(createIdleDeadline(true))
        task.done = true
      }
    }, +options.timeout)
  }

  runInIdleTimeOfFrame(queue)
  return task.id
}

export function cancelIdleCallback(id: number) {
  for (let i = 0; i < queue.length; i += 1) {
    if (queue[i].id === id) {
      queue[i].canceled = true
      break
    }
  }
}

// When the doc is hidden,
// the requestAnimationFrame which the requestIdleCallback based on will be blocked,
// so we should run the queue actively
listenVisibilityChange(hidden => {
  if (hidden) runInIdleTimeOfFrame(queue)
})
