import * as fromPageInputDomain from '~/domain/page-input'

export const invalid = (pageInput: fromPageInputDomain.PageInput): boolean => {
  return fromPageInputDomain.invalid(pageInput)
}
