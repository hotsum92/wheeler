import * as fromUrlDomain from '~/domain/url'

export type UrlKey = string

export const fromUrl = (url: fromUrlDomain.Url): UrlKey => {
  const regEndSlash = /\/$/

  const u = new URL(url)
  const host = u.hostname
  const path = u.pathname.replace(regEndSlash, '')
  const hash = u.hash
  const search = u.search
  return `http://${host}${path}${hash}${search}`
}

export const filterByUrl = (url: fromUrlDomain.Url) => {
  const r = reg(url)

  return (urlKey: UrlKey): boolean => {
    return urlKey.match(r) != null
  }
}

export const reg = (url: fromUrlDomain.Url): string => {
  const regEscapeUrl = /[.*+?^${}()|[\]\\]/g
  const regNumber = /(\d+)/g

  const urlKey = fromUrl(url)
  const escaped = urlKey.replace(regEscapeUrl, '\\$&')
  const reged = escaped.replace(regNumber, '[0-9]+')
  const whole = `^${reged}$`
  return whole
}
