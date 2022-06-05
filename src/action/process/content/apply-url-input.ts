import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'

export const VALIDATED_URL_INPUT = 'APPLY_URL_INPUT.VALIDATED_URL_INPUT'

export interface ValidatedUrlInput {
  type: typeof VALIDATED_URL_INPUT
  payload: {
    url: string
    selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange
  }
}

export const validatedUrlInput =
  (url: string, selectTabObject: fromUrlSelectRangeDomain.UrlSelectRange): ValidatedUrlInput =>
    ({
      type: VALIDATED_URL_INPUT,
      payload: {
        url,
        selectTabObject,
      }
    })

