import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const APPLY_TAB_UPDATE = 'APPLY_TAB_UPDATE.APPLY_TAB_UPDATE'

export interface ApplyTabUpdate {
  type: typeof APPLY_TAB_UPDATE
  payload: {
    url: string
    selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange
  }
}

export const applyTabUpdate =
  (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): ApplyTabUpdate =>
    ({
      type: APPLY_TAB_UPDATE,
      payload: {
        url,
        selectTabObject,
      }
    })
