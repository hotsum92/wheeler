import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

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

export const fromUrl = (url: string): PageInput => {
  // TODO: url モデル作成
  const found = [ ...url.matchAll(/(\d+)/g) ]
  const last = found[found.length - 1]

  return {
    input: last == null ? '' : last[0]
  }
}

export const fromTabObject = (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): PageInput => {
  return {
    input: url.substr(selectTabObject.selectStart, selectTabObject.selectLength)
  }
}

export const invalid = (pageInput: PageInput): boolean => {
  const n = toPage(pageInput)
  if(n.toString() !== pageInput.input) return true
  if(isNaN(n)) return true
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

// TODO: 10, 100

export const toPage = (pageInput: PageInput): number => {
  return parseInt(pageInput.input, 10)
}
