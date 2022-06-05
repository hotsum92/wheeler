export const DISPLAYED_DIV_ELEMNET = 'DISPLAY_EXTENTION.DISPLAYED_DIV_ELEMNET'

export interface DisplayedDivElement {
  type: typeof DISPLAYED_DIV_ELEMNET
  payload: {
  }
}

export const displayedDivElement = () =>
  ({
    type: DISPLAYED_DIV_ELEMNET,
    payload: {
    }
  })
