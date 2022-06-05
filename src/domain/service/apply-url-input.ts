import * as fromUrlInputDomain from '~/domain/url-input'

export const invalid = (urlInput: fromUrlInputDomain.UrlInput): boolean => {
  return fromUrlInputDomain.invalid(urlInput)
}
