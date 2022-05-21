import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const LOAD_URL_SELECT_RANGE_SUCCESS = 'INITIALIZE_CONTENT.LOAD_URL_SELECT_RANGE_SUCCESS'

export interface LoadUrlSelectRangeSuccess {
  type: typeof LOAD_URL_SELECT_RANGE_SUCCESS
  payload: {
    url: string
    selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange
  }
}

export const loadUrlSelectRangeSuccess = (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): LoadUrlSelectRangeSuccess => {
  return {
    type: LOAD_URL_SELECT_RANGE_SUCCESS,
    payload: {
      url,
      selectTabObject,
    }
  }
}

export const INITIALIZE_URL_SELECT_RANGE = 'INITIALIZE_CONTENT.INITIALIZE_URL_SELECT_RANGE'

export interface InitializeUrlSelectRange {
  type: typeof INITIALIZE_URL_SELECT_RANGE
  payload: {
    url: string
  }
}

export const initializeUrlSelectRange = (url: string): InitializeUrlSelectRange => {
  return {
    type: INITIALIZE_URL_SELECT_RANGE,
    payload: {
      url,
    }
  }
}
