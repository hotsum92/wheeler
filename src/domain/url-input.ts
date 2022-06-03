import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export interface UrlInput {
  input: string
  selectStart: number
  select: string
}

export const copy = (props: Partial<UrlInput>): UrlInput => {
  return {
    input: props.input !== undefined ? props.input : '',
    selectStart: props.selectStart !== undefined ? props.selectStart : 0,
    select: props.select !== undefined ? props.select : '',
  }
}

export const newUrlInput = (input: string = '', selectStart: number = 0, select: string = '') => {
  return {
    input,
    selectStart,
    select,
  }
}

export const fromTabObject = (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): UrlInput => {
  return {
    input: url,
    selectStart: selectTabObject.selectStart,
    select: url.substr(selectTabObject.selectStart, selectTabObject.selectLength),
  }
}

export const fromUrl = (url: string): UrlInput => {
  // TODO: url モデル作成
  const found = [ ...url.matchAll(/(\d+)/g) ]
  const last = found[found.length - 1]

  return {
    input: url,
    selectStart: last == null ? 0 : last.index!,
    select: last == null ? '' : last[0],
  }
}

export const invalid = (urlInput: UrlInput): boolean => {
  if(urlInput.input === '') return true
  if(urlInput.select === '') return true
  if(urlInput.selectStart === 0) return true
  if(urlInput.select.match(/[^0-9]/)) return true
  return false
}

export const toUrl = (urlInput: UrlInput): string => {
  return urlInput.input
}

export const assignInput = (_urlInput: UrlInput, input: string): UrlInput => {
  return fromUrl(input)
}

export const assignSelect = (urlInput: UrlInput, selectStart: number, select: string): UrlInput => {
  return {
    ...urlInput,
    selectStart,
    select,
  }
}

export const assignPage = (urlInput: UrlInput, page: number): UrlInput => {
  const found = [ ...urlInput.input.matchAll(/(\d+)/g) ]
    .find(match => match.index! <= urlInput.selectStart && urlInput.selectStart <= match.index! + match[0].length)

  if(found == null) return urlInput

  const url = urlInput.input
  const a = url.slice(0, found.index)
  const b = url.slice(found.index! + found[0].length, url.length)
  return {
    ...urlInput,
    input: a + page.toString() + b,
    select: page.toString(),
  }
}
