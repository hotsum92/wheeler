import { fork, takeLatest, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromGetStorageReducerFunctionProcess from '~/process/function/get-storage-reducer'
import * as fromChromeTabsOnUpdatedChannelProcessAction from '~/action/process/channel/chrome-tabs-on-updated'

export const actions = [
  fromChromeTabsOnUpdatedChannelProcessAction.TAB_STATUS_LOADING,
]

export function* watchWakeContentScript(
  saga: ReturnType<typeof createWakeContentScript>,
) {
  yield fork(saga)

  yield takeLatest(
    actions,
    saga,
  )
}

export const createWakeContentScript = (
  chromeTabsSendMessage: typeof fromChromeModule.chromeTabsSendMessage,
  openContentScript: typeof fromChromeModule.openContentScript,
  chromeStorageLocalGet: typeof fromChromeModule.chromeStorageLocalGet,
  getAllTabIds: typeof fromChromeModule.getAllTabIds,
) => {
  return function* () {
    const tabIds: number[] = yield call(getAllTabIds)

    for(let i = 0; i < tabIds.length; i++) {
      const tabId = tabIds[i]

      const appStatus: fromAppStatusDomain.AppStatus =
        yield call(fromGetStorageReducerFunctionProcess.createGetStorageReducer(chromeStorageLocalGet), fromBackgroundReducer.getAppStatusByTabId, tabId)

      if(fromAppStatusDomain.isRunning(appStatus)) {
        try {
          yield call(chromeTabsSendMessage, tabId, fromChromeTabsOnUpdatedProcessAction.tabStatusLoading(tabId))
        } catch {
          yield call(openContentScript, tabId)
        }
      }
    }
  }
}
