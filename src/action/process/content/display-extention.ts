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
