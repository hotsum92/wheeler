import { takeLatest, call, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromDomModule from '~/module/dom'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromApplyTabUpdateContentProcessAction from '~/action/process/content/apply-tab-update'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
]

export function* watchApplyTabUpdate(
  saga: ReturnType<typeof createApplyTabUpdate>,
) {
  yield takeLatest(
    actions,
    saga,
  )
}

export const createApplyTabUpdate = (
  getUrl: typeof fromDomModule.getUrl,
  chromeRuntimeSendMessage: typeof fromChromeModule.chromeRuntimeSendMessage,
) => {
  return function* (
    _action: Action,
  ) {
    const url: string = yield call(getUrl)
    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
      = yield call(chromeRuntimeSendMessage, fromLoadUrlSelectRangeBackgroundProcessAction.requestLoadUrlSelectRange(url))
    yield put(fromApplyTabUpdateContentProcessAction.loadedUrlSelect(url, urlSelectRange))
  }
}

