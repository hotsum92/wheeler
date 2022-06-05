export const REQUEST_SAVE_URL_SELECT_RANGE = 'SAVE_URL_SELECT_RANGE.REQUEST_SAVE_URL_SELECT_RANGE'

export interface RequestSaveUrlSelectRange {
  type: typeof REQUEST_SAVE_URL_SELECT_RANGE,
  payload: {
    url: string
    selectStart: number
  }
}

export const requestSaveUrlSelectRange =
  (url: string, selectStart: number): RequestSaveUrlSelectRange =>
    ({
      type: REQUEST_SAVE_URL_SELECT_RANGE,
      payload: {
        url,
        selectStart,
      }
    })

export const SAVE_URL_SELECT_RANGE = 'SAVE_URL_SELECT_RANGE.SAVE_URL_SELECT_RANGE'

export interface SaveUrlSelectRange {
  type: typeof SAVE_URL_SELECT_RANGE,
  payload: {
    url: string
    selectStart: number
  }
}

export const saveUrlSelectRange =
  (url: string, selectStart: number): SaveUrlSelectRange =>
    ({
      type: SAVE_URL_SELECT_RANGE,
      payload: {
        url,
        selectStart,
      }
    })

