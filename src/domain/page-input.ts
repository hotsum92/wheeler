import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromUrlDomain from '~/domain/url'

export interface PageInput {
  input: string
}

export const copy = (props: Partial<PageInput>): PageInput => {
  return {
    input: props.input !== undefined ? props.input : '',
  }
}

export const newPageInput = (input: string = ''): PageInput => {
  return {
    input,
  }
}

export const fromUrl = (url: fromUrlDomain.Url): PageInput => {
  const last = fromUrlDomain.matchLastNumber(url)

  return {
    input: last == null ? '' : last.matched
  }
}

export const fromTabObject = (url: fromUrlDomain.Url, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): PageInput => {
  const found = fromUrlDomain.matchNumberAroundIndex(url, selectTabObject.selectStart)

  if(found == null) return newPageInput()

  return {
    input: found.matched
  }
}

export const invalid = (pageInput: PageInput): boolean => {
  const n = toPage(pageInput)
  if(isNaN(n)) return true
  if(n.toString() !== pageInput.input) return true
  return false
}

export const assignInput = (pageInput: PageInput, input: string): PageInput => {
  const replaced = input
    .replace('\r\n', '')
    .replace('\n', '')

  return {
    ...pageInput,
    input: replaced,
  }
}

export const forward = (pageInput: PageInput): PageInput => {
  return {
    ...pageInput,
    input: (Number(pageInput.input) + 1).toString(),
  }
}

export const backward = (pageInput: PageInput): PageInput => {
  return {
    ...pageInput,
    input: (Number(pageInput.input) - 1).toString(),
  }
}

export const toPage = (pageInput: PageInput): number => {
  return parseInt(pageInput.input, 10)
}
