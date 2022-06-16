export const ON_LOAD_CONTENT_UI = 'HANDLE_CHROME_RUNTIME_ON_MESSAGE_CHANNEL.ON_LOAD_CONTENT_UI'

export interface OnLoadContentUi {
  type: typeof ON_LOAD_CONTENT_UI
  payload: {
    tabId: number
  }
}

export const onLoadContentUi = (tabId: number): OnLoadContentUi =>
  ({
    type: ON_LOAD_CONTENT_UI,
    payload: { tabId }
  })
