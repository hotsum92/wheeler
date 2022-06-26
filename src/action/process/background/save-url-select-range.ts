import * as fromUrlDomain from '~/domain/url'

export const SAVE_URL_SELECT_RANGE = 'SAVE_URL_SELECT_RANGE.SAVE_URL_SELECT_RANGE'

export interface SaveUrlSelectRange {
  type: typeof SAVE_URL_SELECT_RANGE,
  payload: {
    url: fromUrlDomain.Url
    selectStart: number
  }
}

export const saveUrlSelectRange =
  (url: fromUrlDomain.Url, selectStart: number): SaveUrlSelectRange =>
    ({
      type: SAVE_URL_SELECT_RANGE,
      payload: {
        url,
        selectStart,
      }
    })

