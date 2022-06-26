import * as fromUrlSelectRangeInputDomain from '~/domain/url-select-range-input'

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

export const VALIDATED_URL_SELECT_RANGE_INPUT = 'HANDLE_CHROME_RUNTIME_ON_MESSAGE_CHANNEL_BACKGROUND.VALIDATED_URL_SELECT_RANGE_INPUT'

export interface ValidatedUrlSelectRangeInput {
  type: typeof VALIDATED_URL_SELECT_RANGE_INPUT
  payload: {
    tabId: number
    urlSelectRangeInput: fromUrlSelectRangeInputDomain.UrlSelectRangeInput
  }
}

export const validatedUrlSelectRangeInput = (tabId: number, urlSelectRangeInput: fromUrlSelectRangeInputDomain.UrlSelectRangeInput): ValidatedUrlSelectRangeInput =>
  ({
    type: VALIDATED_URL_SELECT_RANGE_INPUT,
    payload: {
      tabId,
      urlSelectRangeInput,
    }
  })

export const DISPLAYED_DIV_ELEMNET = 'HANDLE_CHROME_RUNTIME_ON_MESSAGE_CHANNEL_BACKGROUND.DISPLAYED_DIV_ELEMNET'

export interface DisplayedDivElement {
  type: typeof DISPLAYED_DIV_ELEMNET
  payload: {
    tabId: number
  }
}

export const displayedDivElement = (tabId: number): DisplayedDivElement =>
  ({
    type: DISPLAYED_DIV_ELEMNET,
    payload: {
      tabId,
    }
  })

export const HID_DIV_ELEMENT = 'HANDLE_CHROME_RUNTIME_ON_MESSAGE_CHANNEL_BACKGROUND.HID_DIV_ELEMENT'

export interface HidDivElement {
  type: typeof HID_DIV_ELEMENT
  payload: {
    tabId: number
  }
}

export const hidDivElement = (tabId: number): HidDivElement =>
  ({
    type: HID_DIV_ELEMENT,
    payload: {
      tabId,
    }
  })
