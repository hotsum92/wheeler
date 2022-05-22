export const REQUEST_HIDE_EXTENTION = 'HIDE_EXTENTION.REQUEST_HIDE_EXTENTION'

export interface RequestHideExtention {
  type: typeof REQUEST_HIDE_EXTENTION
  payload: {
  }
}

export const requestHideExtention =
  (): RequestHideExtention =>
    ({
      type: REQUEST_HIDE_EXTENTION,
      payload: {
      }
    })
