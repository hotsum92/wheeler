import { takeLatest, select, call, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromChromeModule from '~/module/chrome'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromChromeAction from '~/action/chrome'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'

export const actions = [
  fromChromeAction.ON_CLICK_EXTENTION,
  fromChromeAction.ON_UPDATE_WEB_PAGE,
]

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

    const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatus)

    switch(action.type) {

      case fromChromeAction.ON_CLICK_EXTENTION: {

        if(fromAppStatusDomain.isSuspended(appStatus)) {
          yield call(openContentScriptFromChromeModule, action.payload.tabId)
          yield put(fromLoadContentScriptBackgroundProcessAction.runApp())
        }

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield put(fromLoadContentScriptBackgroundProcessAction.suspendApp())
        }

        return
      }

      case fromChromeAction.ON_UPDATE_WEB_PAGE: {
        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(openContentScriptFromChromeModule, action.payload.tabId)
        }
        return
      }
    }

  }
}
