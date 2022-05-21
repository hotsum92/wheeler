import reducer, * as fromContentUiContentReducer from '~/reducer/content/ui/content'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromAction from '~/action'
import * as fromContentUiAction from '~/action/ui/content'

test('should return the initial state', () => {
  const state = reducer(undefined, fromAction.initial())

  expect(fromContentUiContentReducer.getPageInput(state))
    .toEqual(fromPageInputDomain.newPageInput())
})

test('should not accept a page input being text', () => {
  const input = 'sample text'
  const state = reducer(undefined, fromContentUiAction.onChangePageInput(input))

  expect(fromContentUiContentReducer.getPageInput(state))
    .toEqual(fromPageInputDomain.copy({ input }))
})
