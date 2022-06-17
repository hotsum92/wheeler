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

export const TRANSITION_AUTO_BOOKMARK = 'CHROME_WEB_NAVIGATION_ON_COMMITTED.TRANSITION_AUTO_BOOKMARK'

export interface TrasitionAutoBookmark {
  type: typeof TRANSITION_AUTO_BOOKMARK
  payload: {
    tabId: number
  }
}

export const transitionAutoBookmark = (tabId: number): TrasitionAutoBookmark =>
  ({
    type: TRANSITION_AUTO_BOOKMARK,
    payload: {
      tabId,
    }
  })

export const TRANSITION_TYPED = 'CHROME_WEB_NAVIGATION_ON_COMMITTED.TRANSITION_TYPED'

export interface TransitionTyped {
  type: typeof TRANSITION_TYPED
  payload: {
    tabId: number
  }
}

export const transitionTyped = (tabId: number): TransitionTyped =>
  ({
    type: TRANSITION_TYPED,
    payload: {
      tabId,
    }
  })
