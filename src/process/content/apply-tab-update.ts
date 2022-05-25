import { call, take, put } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromChromeRuntimeOnMessageChannelProcess from '~/process/channel/chrome-runtime-on-message'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromApplyTabUpdateContentProcessAction from '~/action/process/content/apply-tab-update'
import * as fromChromeModule from '~/module/chrome'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
]

export function* watchApplyTabUpdate(
  saga: ReturnType<typeof createApplyTabUpdate>,
) {
  const chan: fromChromeRuntimeOnMessageChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse }: fromChromeRuntimeOnMessageChannelProcess.Message = yield take(chan)
    if(action.type === fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING) {
      yield call(saga, action, sendResponse)
    }
  }
}

export const createApplyTabUpdate = (
  getUrl: typeof fromDomModule.getUrl,
  chromeRuntimeSendMessage: typeof fromChromeModule.chromeRuntimeSendMessage,
) => {
  return function* (
    _action: fromChromeTabsOnUpdatedProcessAction.TabStatusLoading,
    sendResponse: () => void,
  ) {
    yield call(sendResponse)
    const url: string = yield call(getUrl)
    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange
      = yield call(chromeRuntimeSendMessage, fromLoadUrlSelectRangeBackgroundProcessAction.requestLoadUrlSelectRange(url))
    yield put(fromApplyTabUpdateContentProcessAction.applyTabUpdate(url, urlSelectRange))
  }
}

