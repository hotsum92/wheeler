export const ON_CREATED_WINDOW = 'CHROME_WINDOWS_ON_CREATED.ON_CREATED_WINDOW'

export interface OnCreatedWindow {
  type: typeof ON_CREATED_WINDOW
  payload: {
  }
}

export const onCreatedWindow = (): OnCreatedWindow =>
  ({
    type: ON_CREATED_WINDOW,
    payload: {
    }
  })

