import { takeEvery, call, put } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromUrlDomain from '~/domain/url'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromApplyDefaultInputContentProcessAction from '~/action/process/content/apply-default-input'

export const actions = [
  fromContentUiAction.ON_LOAD_CONTENT_UI,
]

export function* watchApplyDefaultInput(saga: ReturnType<typeof createApplyDefaultInput>) {
  yield takeEvery(
    actions,
    saga,
  )
}

export const createApplyDefaultInput = (
  getUrl: typeof fromDomModule.getUrl,
) => {
  return function*() {
    const rowUrl: string = yield call(getUrl)
    const url = fromUrlDomain.fromString(rowUrl)
    yield put(fromApplyDefaultInputContentProcessAction.validatedUrl(url))
  }
}
