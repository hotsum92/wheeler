import { takeEvery, call, select } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'
import * as fromInitializeBackgroundScriptBackgroundProcessAction from '~/action/process/background/initialize-background-script'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'

export const actions = [
  fromInitializeBackgroundScriptBackgroundProcessAction.LOAD_STATE,
]

type Action =
  | fromInitializeBackgroundScriptBackgroundProcessAction.LoadState

export function* watchWakeContentScript(
  saga: ReturnType<typeof createWakeContentScript>,
) {
  yield takeEvery(
    actions,
    saga,
  )
}

export const createWakeContentScript = (
  chromeTabsSendMessage: typeof fromChromeModule.chromeTabsSendMessage,
  openContentScript: typeof fromChromeModule.openContentScript,
) => {
  return function* (_: Action) {
    const tabIds: number[] = yield select(fromBackgroundReducer.getAllTabIds)

    for(let i = 0; i < tabIds.length; i++) {
      const tabId = tabIds[i]
      const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatusByTabId, tabId)
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
