export const RUN_APP = 'LOAD_CONTENT_SCRIPT.RUN_APP'

export interface RunApp {
  type: typeof RUN_APP
  payload: {
    tabId: number
  }
}

export const runApp =
  (tabId: number): RunApp =>
    ({
      type: RUN_APP,
      payload: {
        tabId,
      }
    })

export const SUSPEND_APP = 'LOAD_CONTENT_SCRIPT.SUSPEND_APP'

export interface SuspendApp {
  type: typeof SUSPEND_APP
  payload: {
    tabId: number
  }
}

export const suspendApp =
  (tabId: number): SuspendApp =>
    ({
      type: SUSPEND_APP,
      payload: {
        tabId,
      }
    })
