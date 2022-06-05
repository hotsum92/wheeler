import * as fromPageInputDomain from '~/domain/page-input'

export const notReady = (pageInput: fromPageInputDomain.PageInput): boolean => {
  return fromPageInputDomain.invalid(pageInput)
}
