import * as fromUrlDomain from '~/domain/url'

export type UrlKey = string

export const fromUrl = (url: fromUrlDomain.Url): UrlKey => {
  const { index } = fromUrlDomain.matchLastNumber(url)!
  return fromSelectStart(url, index)
}

export const fromSelectStart = (url: fromUrlDomain.Url, selectStart: number): UrlKey => {
  return url.substring(0, selectStart)
}

export const matchUrl = (urlKey: UrlKey, url: string): boolean => {
  return url.indexOf(urlKey) === 0
}
