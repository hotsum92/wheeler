import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const APPLY_URL = 'APPLY_URL.APPLY_URL'

export interface ApplyUrl {
  type: typeof APPLY_URL
  payload: {
    url: string
    selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange
  }
}

export const applyUrl =
  (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): ApplyUrl =>
    ({
      type: APPLY_URL,
      payload: {
        url,
        selectTabObject,
      }
    })

