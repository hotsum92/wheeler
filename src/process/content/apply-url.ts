import { takeLatest, select, put, call } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromUrlInputDomain from '~/domain/url-input'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromApplyUrlContentProcessAction from '~/action/process/content/apply-url'
import * as fromUpdateUrlContentProcessAction from '~/action/process/content/update-url'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromContentReducer from '~/reducer/content'
import * as fromChromeModule from '~/module/chrome'

export const actions = [
  fromContentUiAction.ON_INPUT_ENTER_KEY_URL_INPUT,
  fromContentUiAction.ON_FOCUS_OUT_URL_INPUT,
]

export function* watchApplyUrl(saga: ReturnType<typeof createApplyUrl>) {
  yield takeLatest(
    actions,
    saga,
  )

}

export const createApplyUrl = (
  chromeRuntimeSendMessage: typeof fromChromeModule.chromeRuntimeSendMessage,
) => {
  return function* (_: Action) {
    const urlInput: fromUrlInputDomain.UrlInput
      = yield select(fromContentReducer.getContentUiUrlInput)

    if(fromUrlInputDomain.invalid(urlInput)) return

    const url = fromUrlInputDomain.toUrl(urlInput)

    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
      = yield call(chromeRuntimeSendMessage, fromLoadUrlSelectRangeBackgroundProcessAction.requestLoadUrlSelectRange(url))

    yield put(fromApplyUrlContentProcessAction.applyUrl(url, urlSelectRange))
    yield put(fromUpdateUrlContentProcessAction.updateUrl(url))

  }
}
