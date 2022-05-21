export const UPDATE_URL = 'UPDATE_URL.UPDATE_URL'

export interface UpdateUrl {
  type: typeof UPDATE_URL
  payload: {
    url: string
  }
}

export const updateUrl =
  (url: string): UpdateUrl =>
    ({
      type: UPDATE_URL,
      payload: {
        url,
      }
    })
