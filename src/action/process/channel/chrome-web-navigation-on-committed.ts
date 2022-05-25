export const TRANSITION_TYPE_LINK = 'CHROME_WEB_NAVIGATION_ON_COMMITTED.TRANSITION_TYPE_LINK'

export interface TransitionTypeLink {
  type: typeof TRANSITION_TYPE_LINK
  payload: {
    tabId: number
  }
}

export const transitionTypeLink = (tabId: number): TransitionTypeLink =>
  ({
    type: TRANSITION_TYPE_LINK,
    payload: {
      tabId,
    }
  })

export const TRANSITION_TYPE_RELOAD = 'CHROME_WEB_NAVIGATION_ON_COMMITTED.TRANSITION_TYPE_RELOAD'

export interface TransitionTypeReload {
  type: typeof TRANSITION_TYPE_RELOAD
  payload: {
    tabId: number
  }
}

export const transitionTypeReload = (tabId: number): TransitionTypeReload =>
  ({
    type: TRANSITION_TYPE_RELOAD,
    payload: {
      tabId,
    }
  })
