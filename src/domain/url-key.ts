import * as fromUrlDomain from '~/domain/url'

export type UrlKey = string

export const fromUrl = (url: fromUrlDomain.Url): UrlKey => {
  const { index } = fromUrlDomain.matchLastNumber(url)!
  const host = fromUrlDomain.host(url)
  const path = fromUrlDomain.subpath(url, index)
  return `http://${host}${path}`
}

export const fromSelectStart = (url: fromUrlDomain.Url, selectStart: number): UrlKey => {
  const { index } = fromUrlDomain.matchNumberAroundIndex(url, selectStart)!
  const host = fromUrlDomain.host(url)
  const path = fromUrlDomain.subpath(url, index)
  return `http://${host}${path}`
}

export const matchUrl = (urlKey: UrlKey, url: string): boolean => {
  return url.indexOf(urlKey) === 0
}

