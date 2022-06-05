export interface UrlSelectRange {
  selectStart: number
}

export const newUrlSelectRange = (selectStart: number = 0): UrlSelectRange => {
  return {
    selectStart,
  }
}

export const fromAction = ({ payload: { selectStart } }: { payload: { selectStart: number } }): UrlSelectRange => {
  return {
    selectStart,
  }
}

export const fromUrl = (url: string): UrlSelectRange => {
  const found = [ ...url.matchAll(/(\d+)/g) ]
  const last = found[found.length - 1]

  return {
    selectStart: last == null ? 0 : last.index!,
  }
}
