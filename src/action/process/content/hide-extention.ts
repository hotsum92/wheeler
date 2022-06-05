export const HID_DIV_ELEMENT = 'HIDE_EXTENTION.HID_DIV_ELEMENT'

export interface HidDivElement {
  type: typeof HID_DIV_ELEMENT
  payload: {
  }
}

export const hidDivElement = (): HidDivElement => {
  return {
    type: HID_DIV_ELEMENT,
    payload: {
    }
  }
}
