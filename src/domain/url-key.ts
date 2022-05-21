export type UrlKey = string

export const fromSelectStart = (url: string, selectStart: number): UrlKey => {
  return url.substring(0, selectStart)
}

export const matchUrl = (urlKey: UrlKey, url: string): Boolean => {
  return url.indexOf(urlKey) === 0
}
