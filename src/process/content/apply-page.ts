import { takeLeading, select, put, call } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromDomModule from '~/module/dom'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromUrlInputDomain from '~/domain/url-input'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyPageContentProcessAction from '~/action/process/content/apply-page'
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
  yield takeLeading(
    actions,
    saga,
  )

}

export const createApplyPage = (
  assignUrl: typeof fromDomModule.assignUrl,
) => {
  return function* (_: Action) {
    const pageInput: fromPageInputDomain.PageInput
      = yield select(fromContentReducer.getContentUiPageInput)

    const urlInputCurrent: fromUrlInputDomain.UrlInput
      = yield select(fromContentReducer.getContentUiUrlInput)

    if(fromPageInputDomain.invalid(pageInput)
       || fromUrlInputDomain.invalid(urlInputCurrent)
      ) return

    yield put(fromApplyPageContentProcessAction.applyPage(fromPageInputDomain.toPage(pageInput)))

    const url: string
      = yield select(fromContentReducer.getUrl)

    yield call(assignUrl, url)
  }
}
