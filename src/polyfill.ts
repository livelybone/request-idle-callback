import { cancelIdleCallback, requestIdleCallback } from './index'

const root: any = typeof window === 'undefined' ? global || {} : window

if (!root.requestIdleCallback || !root.cancelIdleCallback) {
  root.requestIdleCallback = requestIdleCallback
  root.cancelIdleCallback = cancelIdleCallback
}
