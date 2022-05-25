import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const REQUEST_APPLY_TAB_UPDATE = 'APPLY_TAB_UPDATE.REQUEST_APPLY_TAB_UPDATE'

export interface RequestApplyTabUpdate {
  type: typeof REQUEST_APPLY_TAB_UPDATE
  payload: {
  }
}

export const requestApplyTabUpdate =
  (): RequestApplyTabUpdate =>
    ({
      type: REQUEST_APPLY_TAB_UPDATE,
      payload: {
      }
    })

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
