import * as fromUrlDomain from '~/domain/url'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export interface UrlInput {
  input: string
  selectStart: number
}

export const copy = (props: Partial<UrlInput>): UrlInput => {
  return {
    input: props.input !== undefined ? props.input : '',
    selectStart: props.selectStart !== undefined ? props.selectStart : 0,
  }
}

export const newUrlInput = (input: string = '', selectStart: number = 0) => {
  return {
    input,
    selectStart,
  }
}

export const fromTabObject = (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): UrlInput => {
  return {
    input: url,
    selectStart: selectTabObject.selectStart,
  }
}

export const fromUrl = (url: fromUrlDomain.Url): UrlInput => {
  const last = fromUrlDomain.matchLastNumber(url)

  return {
    input: url,
    selectStart: last == null ? 0 : last.index,
  }
}

export const invalid = (urlInput: UrlInput): boolean => {
  if(urlInput.input === '') return true
  return false
}

export const toUrl = (urlInput: UrlInput): string => {
  return urlInput.input
}

export const assignInput = (_urlInput: UrlInput, input: string): UrlInput => {
  return fromUrl(input)
}

export const assignSelect = (urlInput: UrlInput, selectStart: number): UrlInput => {
  return {
    ...urlInput,
    selectStart,
  }
}

export const assignPageInput = (urlInput: UrlInput, pageInput: fromPageInputDomain.PageInput): UrlInput => {
  const page = fromPageInputDomain.toPage(pageInput)
  const url = fromUrlDomain.fromUrlInput(urlInput)
  const found = fromUrlDomain.matchNumberAroundIndex(url, urlInput.selectStart)

  if(found == null) return urlInput

  return {
    ...urlInput,
    input: fromUrlDomain.assignPage(url, urlInput.selectStart, page),
  }
}
