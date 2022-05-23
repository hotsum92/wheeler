export const TAB_STATUS_LOADING = 'HANDLE_CHROME_TABS_ON_UPDATED.TAB_STATUS_LOADING'

export interface TabStatusLoading {
  type: typeof TAB_STATUS_LOADING
  payload: {
    tabId: number
  }
}

export const tabStatusLoading = (tabId: number): TabStatusLoading =>
  ({
    type: TAB_STATUS_LOADING,
    payload: {
      tabId,
    }
  })

export const TAB_STATUS_COMPLETE = 'HANDLE_CHROME_TABS_ON_UPDATED.TAB_STATUS_COMPLETE'

export interface TabStatusComplete {
  type: typeof TAB_STATUS_COMPLETE
  payload: {
    tabId: number
  }
}

export const tabStatusComplete = (tabId: number): TabStatusComplete =>
  ({
    type: TAB_STATUS_COMPLETE,
    payload: {
      tabId,
    }
  })

