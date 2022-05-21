export const RUN_APP = 'LOAD_CONTENT_SCRIPT.RUN_APP'

export interface RunApp {
  type: typeof RUN_APP
  payload: {
  }
}

export const runApp =
  (): RunApp =>
    ({
      type: RUN_APP,
      payload: {
      }
    })

export const SUSPEND_APP = 'LOAD_CONTENT_SCRIPT.SUSPEND_APP'

export interface SuspendApp {
  type: typeof SUSPEND_APP
  payload: {
  }
}

export const suspendApp =
  (): SuspendApp =>
    ({
      type: SUSPEND_APP,
      payload: {
      }
    })
