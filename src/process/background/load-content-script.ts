import { takeLatest, select, call, put } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromHideExtentionBackgroundProcessAction from '~/action/process/content/hide-extention'
import * as fromChromeAction from '~/action/chrome'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'

export const actions = [
  fromChromeAction.ON_CLICK_EXTENTION,
  fromChromeAction.ON_UPDATE_WEB_PAGE,
]

type Action =
  | fromChromeAction.OnClickExtention
  | fromChromeAction.OnUpdateWebPage

export function* watchLoadContentScript(saga: ReturnType<typeof createLoadContentScript>) {
  yield takeLatest(
    actions,
    saga,
  )
}

export const createLoadContentScript = (
  openContentScriptFromChromeModule: typeof fromChromeModule.openContentScript,
) => {
  return function* (action: Action) {

    const { payload: { tabId } } = action

    const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatusByTabId, tabId)

    switch(action.type) {

      case fromChromeAction.ON_CLICK_EXTENTION: {

        if(fromAppStatusDomain.isStop(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
          yield put(fromLoadContentScriptBackgroundProcessAction.runApp(tabId))
        }

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(fromChromeModule.chromeTabsSendMessage, tabId, fromHideExtentionBackgroundProcessAction.requestHideExtention())
          yield put(fromLoadContentScriptBackgroundProcessAction.suspendApp(tabId))
        }

        return
      }

      case fromChromeAction.ON_UPDATE_WEB_PAGE: {
        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
        }
        return
      }
    }

  }
}
