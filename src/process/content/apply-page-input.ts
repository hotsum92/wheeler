import { takeLeading, select, put, call } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromDomModule from '~/module/dom'
import * as fromPageInputDomain from '~/domain/page-input'
import * as fromApplyPageInputServiceDomain from '~/domain/service/apply-page-input'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyPageInputContentProcessAction from '~/action/process/content/apply-page-input'
import * as fromContentReducer from '~/reducer/content'

export const actions = [
  fromContentUiAction.ON_INPUT_ENTER_KEY_PAGE_INPUT,
  fromContentUiAction.ON_FOCUS_OUT_PAGE_INPUT,
  fromContentUiAction.ON_CLICK_BACKWARD_BUTTON,
  fromContentUiAction.ON_CLICK_FORWARD_BUTTON,
  fromContentUiAction.ON_WHEEL_UP,
  fromContentUiAction.ON_WHEEL_DOWN,
]

export function* watchApplyPageInput(saga: ReturnType<typeof createApplyPageInput>) {
  yield takeLeading(
    actions,
    saga,
  )

}

export const createApplyPageInput = (
  assignUrl: typeof fromDomModule.assignUrl,
) => {
  return function* (_: Action) {
    const pageInput: fromPageInputDomain.PageInput
      = yield select(fromContentReducer.getContentUiPageInput)

    if(fromApplyPageInputServiceDomain.notReady(pageInput)) return

    yield put(fromApplyPageInputContentProcessAction.validatedPageInput(pageInput))

    const url: string
      = yield select(fromContentReducer.getUrl)

    yield call(assignUrl, url)
  }
}
