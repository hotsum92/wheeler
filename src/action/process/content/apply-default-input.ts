import * as fromUrlDomain from '~/domain/url'

export const VALIDATED_URL = 'APPLY_DEFAULT_INPUT.VALIDATED_URL'

export interface ValidatedUrl {
  type: typeof VALIDATED_URL
  payload: {
    url: fromUrlDomain.Url
  }
}

export const validatedUrl =
  (url: fromUrlDomain.Url): ValidatedUrl =>
    ({
      type: VALIDATED_URL,
      payload: {
        url,
      }
    })
