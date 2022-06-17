import { takeLatest, call, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromInitializeContentContentProcessAction from '~/action/process/content/initialize-content'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromDomModule from '~/module/dom'
import * as fromChromeModule from '~/module/chrome'

export const actions = [
  fromContentUiAction.ON_LOAD_CONTENT_UI,
]

export function* watchInitializeContent(saga: ReturnType<typeof createInitializeContent>) {
  yield takeLatest(
    actions,
    saga,
  )
}

// TODO: testの変更で削除できる
export const createInitializeContent = (
  getUrlFromDomModule: typeof fromDomModule.getUrl,
  chromeRuntimeSendMessage: typeof fromChromeModule.chromeRuntimeSendMessage,
) => {
  return function* (_: Action) {

    const url: string = yield call(getUrlFromDomModule)

    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
      = yield call(chromeRuntimeSendMessage, fromLoadUrlSelectRangeBackgroundProcessAction.requestLoadUrlSelectRange(url))

    yield put(fromInitializeContentContentProcessAction.loadUrlSelectRangeSuccess(url, urlSelectRange))
  }
}
