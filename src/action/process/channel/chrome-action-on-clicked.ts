export const ON_CLICK_EXTENTION = 'CHROME_ACTION_ON_CLICKED.ON_CLICK_EXTENTION'

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

