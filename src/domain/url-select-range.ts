import * as fromUrlDomain from '~/domain/url'

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
  const matchResult = fromUrlDomain.matchLastNumber(url)

  if(matchResult == null) return { selectStart: 0 }

  return {
    selectStart: matchResult.index,
  }
}
