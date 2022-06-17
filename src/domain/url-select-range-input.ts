import { pipe } from '~/helper'
import * as fromPageDomain from '~/domain/page'

export interface UrlSelectRangeInput {
  selectStart: number
  select: string
}

export const invalid = (urlSelectRangeInput: UrlSelectRangeInput): boolean => {
  return pipe(urlSelectRangeInput.select)
          (fromPageDomain.invalid)
          ()
}

export const fromObj = ({ selectStart, select }: { selectStart: number, select: string }): UrlSelectRangeInput => {
  return {
    selectStart,
    select,
  }
}

