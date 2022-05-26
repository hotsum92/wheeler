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

export const HIDE_APP = 'LOAD_CONTENT_SCRIPT.HIDE_APP'

export interface HideApp {
  type: typeof HIDE_APP
  payload: {
    tabId: number
  }
}

export const hideApp =
  (tabId: number): HideApp =>
    ({
      type: HIDE_APP,
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
