import * as fromUrlInputDomain from '~/domain/url-input'

export type Url = string

export interface MatchResult {
  index: number
  matched: string
}

const regNumber = /(\d+)/g
const regEndSlash = /\/$/

export const newUrl = (url: string = ''): Url => {
  return url
}

export const fromString = (str: string): Url => {
  return str
}

export const fromUrlInput = (urlInput: fromUrlInputDomain.UrlInput): Url => {
  return urlInput.input
}

export const origin = (url: Url): string => {
  const urlObj = new URL(url)
  return urlObj.origin
}

export const host = (url: Url): string => {
  const urlObj = new URL(url)
  return urlObj.hostname
}

export const subpath = (url: Url, index: number): string => {
  const suburl = url.substring(0, index)
  const urlObj = new URL(suburl)
  return urlObj.pathname.replace(regEndSlash, '')
}

export const matchLastNumber = (url: Url): MatchResult => {
  const found = [ ...url.matchAll(regNumber) ]
  const last = found[found.length - 1]
  return { index: last.index!, matched: last[0] }
}

export const matchNumberAroundIndex = (url: Url, index: number): MatchResult | null => {
  const found = [ ...url.matchAll(regNumber) ]
    .find(match => match.index! <= index && index <= match.index! + match[0].length)

  if(found == null) return null
  return { index: found.index!, matched: found[0] }
}

export const assignPage = (url: Url, index: number, page: number): Url => {
  const found = matchNumberAroundIndex(url, index)!

  const a = url.slice(0, found.index)
  const b = url.slice(found.index! + found.matched.length, url.length)

  return a + page.toString() + b
}

