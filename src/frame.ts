import FrameDuration from 'frame-duration'
import { DocVisibility } from './doc-visibility-change'
import { IdleDeadline, IdleTask } from './type'

FrameDuration.duration = 1000 / 60

const now = () => new Date().getTime()

let endTimeOfLastFrame = now()

function timeRemaining() {
  return Math.max(0, FrameDuration.duration - (now() - endTimeOfLastFrame))
}

export function createIdleDeadline(didTimeout: boolean): IdleDeadline {
  return {
    didTimeout,
    timeRemaining: () => (timeRemaining() * 50) / FrameDuration.duration,
  }
}

let handleId: any

export function runInIdleTimeOfFrame(queue: IdleTask[]) {
  cancelAnimationFrame(handleId)

  const run = () => {
    // Run immediate after other raf callback in one frame
    setTimeout(() => {
      let i = 0
      for (; timeRemaining() && i < queue.length; i += 1) {
        const task = queue[i]
        if (!task.canceled && !task.done) {
          try {
            task.callback(createIdleDeadline(false))
          } catch (e) {
            // prettier-ignore
            setTimeout(() => { throw e }, 0)
          }
          task.done = true
        }
      }
      // Update the task queue. this is not pure
      queue.splice(0, i)

      endTimeOfLastFrame = now()

      // Run the rest of tasks in next loop
      if (queue.length) runInIdleTimeOfFrame(queue)
    })
  }

  if (!DocVisibility.hidden) {
    // Run in idle time of next frame
    handleId = requestAnimationFrame(run)
  } else {
    // Run immediately when the doc is hidden,
    // because the requestAnimationFrame will be blocked when the doc is hidden
    run()
  }
}
