import * as fromPageInputDomain from '~/domain/page-input'

export const VALIDATED_PAGE_INPUT = 'APPLY_PAGE_INPUT.VALIDATED_PAGE_INPUT'

export interface ValidatedPageInput {
  type: typeof VALIDATED_PAGE_INPUT
  payload: {
    pageInput: fromPageInputDomain.PageInput
  }
}

export const validatedPageInput =
  (pageInput: fromPageInputDomain.PageInput): ValidatedPageInput =>
    ({
      type: VALIDATED_PAGE_INPUT,
      payload: {
        pageInput,
      }
    })

