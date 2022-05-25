import { takeLatest, select, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromUrlInputDomain from '~/domain/url-input'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyPageContentProcessAction from '~/action/process/content/apply-page'
import * as fromUpdateUrlContentProcessAction from '~/action/process/content/update-url'
import * as fromContentReducer from '~/reducer/content'

export const actions = [
  fromContentUiAction.ON_INPUT_ENTER_KEY_PAGE_INPUT,
  fromContentUiAction.ON_FOCUS_OUT_PAGE_INPUT,
  fromContentUiAction.ON_CLICK_BACKWARD_BUTTON,
  fromContentUiAction.ON_CLICK_FORWARD_BUTTON,
  fromContentUiAction.ON_WHEEL_UP,
  fromContentUiAction.ON_WHEEL_DOWN,
]

export function* watchApplyPage(saga: ReturnType<typeof createApplyPage>) {
  yield takeLatest(
    actions,
    saga,
  )

}

export const createApplyPage = (
) => {
  return function* (_: Action) {
    const pageInput: fromPageInputDomain.PageInput
      = yield select(fromContentReducer.getContentUiPageInput)

    if(fromPageInputDomain.invalid(pageInput)) return

    yield put(fromApplyPageContentProcessAction.applyPage(fromPageInputDomain.toPage(pageInput)))

    const urlInput: fromUrlInputDomain.UrlInput
      = yield select(fromContentReducer.getContentUiUrlInput)

    yield put(fromUpdateUrlContentProcessAction.updateUrl(urlInput.input))

  }
}
