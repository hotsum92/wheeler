import * as fromUrlSelectRangeInputDomain from '~/domain/url-select-range-input'

export const VALIDATED_URL_SELECT_RANGE_INPUT = 'APPLY_URL_SELECT_RANGE_INPUT.VALIDATED_URL_SELECT_RANGE_INPUT'

export interface ValidatedUrlSelectRangeInput {
  type: typeof VALIDATED_URL_SELECT_RANGE_INPUT
  payload: {
    urlSelectRangeInput: fromUrlSelectRangeInputDomain.UrlSelectRangeInput
  }
}

export const validatedUrlSelectRangeInput = (urlSelectRangeInput: fromUrlSelectRangeInputDomain.UrlSelectRangeInput): ValidatedUrlSelectRangeInput =>
  ({
    type: VALIDATED_URL_SELECT_RANGE_INPUT,
    payload: {
      urlSelectRangeInput,
    }
  })
