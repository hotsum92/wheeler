export interface UrlSelectRange {
  selectStart: number
  selectLength: number
}

export const newUrlSelectRange = (selectStart: number = 0, selectLength: number = 0): UrlSelectRange => {
  return {
    selectStart,
    selectLength,
  }
}

export const fromAction = ({ payload: { selectStart, selectLength } }: { payload: { selectStart: number, selectLength: number } }): UrlSelectRange => {
  return {
    selectStart,
    selectLength,
  }
}

export const fromUrl = (url: string): UrlSelectRange => {
  // TODO: url モデル作成
  const found = [ ...url.matchAll(/(\d+)/g) ]
  const last = found[found.length - 1]

  return {
    selectStart: last == null ? 0 : last.index!,
    selectLength: last == null ? 0 : last[0].length,
  }
}
