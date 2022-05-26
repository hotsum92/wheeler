import { takeLatest, select, call, put } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromHideExtentionBackgroundProcessAction from '~/action/process/content/hide-extention'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromChromeWebNavigationOnCommittedChannelProcessAction from '~/action/process/channel/chrome-web-navigation-on-committed'
import * as fromChromeTabsOnUpdatedChannelProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'

export const actions = [
  fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION,
  fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPE_LINK,
  fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPE_RELOAD,
  fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_AUTO_BOOKMARK,
  fromChromeTabsOnUpdatedChannelProcessAction.TAB_STATUS_LOADING,
]

type Action =
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeLink
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeReload
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TrasitionAutoBookmark
  | fromChromeTabsOnUpdatedChannelProcessAction.TabStatusLoading

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

      case fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION: {

        if(fromAppStatusDomain.isStop(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
          yield put(fromLoadContentScriptBackgroundProcessAction.runApp(tabId))
        }

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(chromeTabsSendMessage, tabId, fromHideExtentionBackgroundProcessAction.requestHideExtention())
          yield put(fromLoadContentScriptBackgroundProcessAction.hideApp(tabId))
        }

        if(fromAppStatusDomain.isHidden(appStatus)) {
          yield call(chromeTabsSendMessage, tabId, fromDisplayExtentionContentProcessAction.requestDisplayExtention())
          yield put(fromLoadContentScriptBackgroundProcessAction.runApp(tabId))
        }

        return
      }

      case fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPE_RELOAD:
      case fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPE_LINK: {

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
        }

        return
      }


      case fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_AUTO_BOOKMARK: {

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield put(fromLoadContentScriptBackgroundProcessAction.stopApp(tabId))
        }

        return
      }

    }

  }
}
