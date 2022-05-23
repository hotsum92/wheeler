export const TRANSITION_TYPE_LINK = 'HANDLE_CHROME_WEB_NAVIGATION_ON_COMMITTED.TRANSITION_TYPE_LINK'

export interface TransitionTypeLink {
  type: typeof TRANSITION_TYPE_LINK
  payload: {
  }
}

export const transitionTypeLink = (): TransitionTypeLink =>
  ({
    type: TRANSITION_TYPE_LINK,
    payload: {
    }
  })

export const TRANSITION_TYPE_RELOAD = 'HANDLE_CHROME_WEB_NAVIGATION_ON_COMMITTED.TRANSITION_TYPE_RELOAD'

export interface TransitionTypeReload {
  type: typeof TRANSITION_TYPE_RELOAD
  payload: {
  }
}

export const transitionTypeReload = (): TransitionTypeReload =>
  ({
    type: TRANSITION_TYPE_RELOAD,
    payload: {
    }
  })
