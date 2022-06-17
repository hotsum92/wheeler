import { takeLeading, put } from 'redux-saga/effects'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromUrlSelectRangeInputDomain from '~/domain/url-select-range-input'
import * as fromApplyUrlSelectRangeInputContentProcessAction from '~/action/process/content/apply-url-select-range-input'

export const actions = [
  fromContentUiAction.ON_SELECT_URL_INPUT,
]

export function* watchApplyUrlSelectRangeInput(saga: ReturnType<typeof createApplyUrlSelectRangeInput>) {
  yield takeLeading(
    actions,
    saga,
  )

}

export const createApplyUrlSelectRangeInput = (
) => {
  return function* (action: fromContentUiAction.OnSelectUrlInput) {
    const urlSelectRangeInput = fromUrlSelectRangeInputDomain.fromObj(action.payload)

    if(fromUrlSelectRangeInputDomain.invalid(urlSelectRangeInput)) return

    yield put(fromApplyUrlSelectRangeInputContentProcessAction.validatedUrlSelectRangeInput(urlSelectRangeInput))
  }
}
