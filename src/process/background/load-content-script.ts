import { takeLatest, select, call, put } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromHideExtentionBackgroundProcessAction from '~/action/process/content/hide-extention'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromHandleChromeWebNavigationOnCommittedChromeAction from '~/action/chrome/handle-chrome-web-navigation-on-committed'
import * as fromHandleChromeTabsOnUpdatedChromeAction from '~/action/chrome/handle-chrome-tabs-on-updated'
import * as fromHandleChromeActionOnClickedChromeProcessAction from '~/action/chrome/handle-chrome-action-on-clicked'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'

export const actions = [
  fromHandleChromeActionOnClickedChromeProcessAction.ON_CLICK_EXTENTION,
  fromHandleChromeWebNavigationOnCommittedChromeAction.TRANSITION_TYPE_LINK,
  fromHandleChromeWebNavigationOnCommittedChromeAction.TRANSITION_TYPE_RELOAD,
  fromHandleChromeTabsOnUpdatedChromeAction.TAB_STATUS_LOADING,
]

type Action =
  | fromHandleChromeActionOnClickedChromeProcessAction.OnClickExtention
  | fromHandleChromeWebNavigationOnCommittedChromeAction.TransitionTypeLink
  | fromHandleChromeWebNavigationOnCommittedChromeAction.TransitionTypeReload
  | fromHandleChromeTabsOnUpdatedChromeAction.TabStatusLoading

export function* watchLoadContentScript(saga: ReturnType<typeof createLoadContentScript>) {
  yield takeLatest(
    actions,
    saga,
  )
}

export const createLoadContentScript = (
  openContentScriptFromChromeModule: typeof fromChromeModule.openContentScript,
  chromeTabsSendMessage: typeof fromChromeModule.chromeTabsSendMessage,
) => {
  return function* (action: Action) {

    const { payload: { tabId } } = action

    const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatusByTabId, tabId)

    switch(action.type) {

      case fromHandleChromeActionOnClickedChromeProcessAction.ON_CLICK_EXTENTION: {

        if(fromAppStatusDomain.isStop(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
          yield put(fromLoadContentScriptBackgroundProcessAction.runApp(tabId))
        }

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(chromeTabsSendMessage, tabId, fromHideExtentionBackgroundProcessAction.requestHideExtention())
          yield put(fromLoadContentScriptBackgroundProcessAction.suspendApp(tabId))
        }

        if(fromAppStatusDomain.isSuspended(appStatus)) {
          yield call(chromeTabsSendMessage, tabId, fromDisplayExtentionContentProcessAction.requestDisplayExtention())
          yield put(fromLoadContentScriptBackgroundProcessAction.runApp(tabId))
        }

        return
      }

      case fromHandleChromeWebNavigationOnCommittedChromeAction.TRANSITION_TYPE_RELOAD:
      case fromHandleChromeWebNavigationOnCommittedChromeAction.TRANSITION_TYPE_LINK: {

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
        }

        return
      }

      case fromHandleChromeTabsOnUpdatedChromeAction.TAB_STATUS_LOADING: {
        // TODO: URL変更時の処理
        if(fromAppStatusDomain.isRunning(appStatus)) {
          //yield call(openContentScriptFromChromeModule, tabId)
        }
        return
      }
    }

  }
}
