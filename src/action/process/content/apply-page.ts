export const APPLY_PAGE = 'APPLY_PAGE.APPLY_PAGE'

export interface ApplyPage {
  type: typeof APPLY_PAGE
  payload: {
    page: number
  }
}

export const applyPage =
  (page: number): ApplyPage =>
    ({
      type: APPLY_PAGE,
      payload: {
        page,
      }
    })

