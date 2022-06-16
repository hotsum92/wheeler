import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const DETECTED_URL_SELECT_RANGE_UPDATE = 'DETECT_URL_SELECT_RANGE_UPDATE.DETECTED_URL_SELECT_RANGE_UPDATE'

export interface DetectedUrlSelectRangeUpdate {
  type: typeof DETECTED_URL_SELECT_RANGE_UPDATE,
  payload: {
    tabId: number
    urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
  }
}

export const detectedUrlSelectRangeUpdate =
  (tabId: number, urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange): DetectedUrlSelectRangeUpdate =>
    ({
      type: DETECTED_URL_SELECT_RANGE_UPDATE,
      payload: {
        tabId,
        urlSelectRange,
      }
    })

