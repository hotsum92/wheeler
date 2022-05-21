export const ON_CLICK_EXTENTION = 'CHROME.ON_CLICK_EXTENTION'

export interface OnClickExtention {
  type: typeof ON_CLICK_EXTENTION
  payload: {
    tabId: number
  }
}

export const onClickExtention = (tabId: number): OnClickExtention =>
  ({
    type: ON_CLICK_EXTENTION,
    payload: {
      tabId,
    }
  })

export const ON_UPDATE_WEB_PAGE = 'CHROME.ON_UPDATE_WEB_PAGE'

export interface OnUpdateWebPage {
  type: typeof ON_UPDATE_WEB_PAGE
  payload: {
    tabId: number
  }
}

export const onUpdateWebPage = (tabId: number): OnUpdateWebPage =>
  ({
    type: ON_UPDATE_WEB_PAGE,
    payload: {
      tabId,
    }
  })

export const ON_MESSAGE_EXTENTION = 'CHROME.ON_MESSAGE_EXTENTION'

export interface OnMessageExtention {
  type: typeof ON_MESSAGE_EXTENTION
  payload: {
  }
}

export const onMessageExtention = (): OnMessageExtention =>
  ({
    type: ON_MESSAGE_EXTENTION,
    payload: {
    }
  })

