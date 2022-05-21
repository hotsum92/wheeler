import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const REQUEST_LOAD_URL_SELECT_RANGE = 'LOAD_URL_SELECT_RANGE.REQUEST_LOAD_URL_SELECT_RANGE'

export interface RequestLoadUrlSelectRange {
  type: typeof REQUEST_LOAD_URL_SELECT_RANGE,
  payload: {
    url: string
  }
}

export const requestLoadUrlSelectRange =
  (url: string): RequestLoadUrlSelectRange =>
    ({
      type: REQUEST_LOAD_URL_SELECT_RANGE,
      payload: {
        url,
      }
    })

export const LOAD_URL_SELECT_RANGE = 'LOAD_URL_SELECT_RANGE.LOAD_URL_SELECT_RANGE'

export interface LoadUrlSelectRange {
  type: typeof LOAD_URL_SELECT_RANGE
  payload: {
    tabId: number
    urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange | null
  }
}

export const loadUrlSelectRange =
  (tabId: number, urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange | null): LoadUrlSelectRange =>
    ({
      type: LOAD_URL_SELECT_RANGE,
      payload: {
        tabId,
        urlSelectRange,
      }
    })

