export const SAVE_SELECT_RANGE = 'SAVE_SELECT_RANGE.SAVE_SELECT_RANGE'

export interface SaveSelectRange {
  type: typeof SAVE_SELECT_RANGE
  payload: {
    url: string
    selectStart: number
    selectLength: number
  }
}

export const saveSelectRange =
  (url: string, selectStart: number, selectLength: number): SaveSelectRange =>
    ({
      type: SAVE_SELECT_RANGE,
      payload: {
        url,
        selectStart,
        selectLength,
      }
    })
