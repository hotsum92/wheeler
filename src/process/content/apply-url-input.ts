import { takeLeading, select, call } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromApplyUrlInputServiceDomain from '~/domain/service/apply-url-input'
import * as fromDomModule from '~/module/dom'
import * as fromUrlInputDomain from '~/domain/url-input'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromContentReducer from '~/reducer/content'

export const actions = [
  fromContentUiAction.ON_INPUT_ENTER_KEY_URL_INPUT,
  fromContentUiAction.ON_FOCUS_OUT_URL_INPUT,
]

export function* watchApplyUrlInput(saga: ReturnType<typeof createApplyUrlInput>) {
  yield takeLeading(
    actions,
    saga,
  )

}

export const createApplyUrlInput = (
  assignUrl: typeof fromDomModule.assignUrl,
) => {
  return function* (_: Action) {
    const urlInput: fromUrlInputDomain.UrlInput
      = yield select(fromContentReducer.getContentUiUrlInput)

    if(fromApplyUrlInputServiceDomain.invalid(urlInput)) return

    const url = fromUrlInputDomain.toUrl(urlInput)

    yield call(assignUrl, url)

  }
}
