import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const REQUEST_DISPLAY_EXTENTION = 'DISPLAY_EXTENTION.REQUEST_DISPLAY_EXTENTION'

export interface RequestDisplayExtention {
  type: typeof REQUEST_DISPLAY_EXTENTION
  payload: {
  }
}

export const requestDisplayExtention =
  (): RequestDisplayExtention =>
    ({
      type: REQUEST_DISPLAY_EXTENTION,
      payload: {
      }
    })

export const LOAD_URL_SELECT_RANGE_SUCCESS = 'DISPLAY_EXTENTION.LOAD_URL_SELECT_RANGE_SUCCESS'

export interface LoadUrlSelectRangeSuccess {
  type: typeof LOAD_URL_SELECT_RANGE_SUCCESS
  payload: {
    url: string
    selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange
  }
}

export const loadUrlSelectRangeSuccess =
  (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): LoadUrlSelectRangeSuccess =>
    ({
      type: LOAD_URL_SELECT_RANGE_SUCCESS,
      payload: {
        url,
        selectTabObject,
      }
    })
