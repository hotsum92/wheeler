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

export const STOP_APP = 'LOAD_CONTENT_SCRIPT.STOP_APP'

export interface StopApp {
  type: typeof STOP_APP
  payload: {
    tabId: number
  }
}

export const stopApp =
  (tabId: number): StopApp =>
    ({
      type: STOP_APP,
      payload: {
        tabId,
      }
    })
