export const DocVisibility = {
  hidden: false,
}

export function listenVisibilityChange(cb: (docHidden: boolean) => any) {
  if (typeof document !== 'undefined') {
    const hiddenProp =
      'hidden' in document
        ? 'hidden'
        : 'webkitHidden' in document
        ? 'webkitHidden'
        : 'mozHidden' in document
        ? 'mozHidden'
        : null

    if (hiddenProp) {
      const visibilityChangeEventName = hiddenProp.replace(
        /hidden/i,
        'visibilitychange',
      )
      window.addEventListener(visibilityChangeEventName, () => {
        // @ts-ignore
        DocVisibility.hidden = document[hiddenProp]
        cb(DocVisibility.hidden)
      })
    }
  }
}
