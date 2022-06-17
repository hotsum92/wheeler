export const ON_LOAD_CONTENT_UI = 'HANDLE_CHROME_RUNTIME_ON_MESSAGE_CHANNEL_BACKGROUND.ON_LOAD_CONTENT_UI'

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

export const ON_SELECT_URL_INPUT = 'HANDLE_CHROME_RUNTIME_ON_MESSAGE_CHANNEL_BACKGROUND.ON_SELECT_URL_INPUT'

export interface OnSelectUrlInput {
  type: typeof ON_SELECT_URL_INPUT
  payload: {
    tabId: number,
    selectStart: number,
    select: string,
  }
}

export const onSelectUrlInput = (tabId: number, selectStart: number, select: string): OnSelectUrlInput =>
  ({
    type: ON_SELECT_URL_INPUT,
    payload: {
      tabId,
      selectStart,
      select,
    }
  })
