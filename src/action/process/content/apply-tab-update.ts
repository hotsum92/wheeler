import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const LOADED_URL_SELECT = 'APPLY_TAB_UPDATE.LOADED_URL_SELECT'

export interface LoadedUrlSelect {
  type: typeof LOADED_URL_SELECT
  payload: {
    url: string
    selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange
  }
}

export const loadedUrlSelect =
  (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): LoadedUrlSelect =>
    ({
      type: LOADED_URL_SELECT,
      payload: {
        url,
        selectTabObject,
      }
    })
