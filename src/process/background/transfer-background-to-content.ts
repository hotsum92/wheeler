import { takeEvery, call, select } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
]

type Action =
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading

export function* watchTransferBackgroundToContent(
  saga: ReturnType<typeof createTransferBackgroundToContent>,
) {
  yield takeEvery(
    actions,
    saga,
  )
}

export const createTransferBackgroundToContent = (
  chromeTabsSendMessage: typeof fromChromeModule.chromeTabsSendMessage,
) => {
  return function* (action: Action) {

    const { payload: { tabId } } = action
    const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatusByTabId, tabId)

    if(fromAppStatusDomain.isRunning(appStatus)) {
      yield call(chromeTabsSendMessage, action.payload.tabId, action)
    }

  }
}
