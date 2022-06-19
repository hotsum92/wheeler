import { takeLatest, select, call, put } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
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
  fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPED,
  fromChromeTabsOnUpdatedChannelProcessAction.TAB_STATUS_LOADING,
]

type Action =
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeLink
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTypeReload
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TrasitionAutoBookmark
  | fromChromeWebNavigationOnCommittedChannelProcessAction.TransitionTyped
  | fromChromeTabsOnUpdatedChannelProcessAction.TabStatusLoading

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

    switch(action.type) {

      case fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION: {
        const { payload: { tabId } } = action
        const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatusByTabId, tabId)

        if(fromAppStatusDomain.isStop(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
          yield put(fromLoadContentScriptBackgroundProcessAction.runApp(tabId))
        }

        return
      }

      case fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPE_RELOAD:
      case fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPED:
      case fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_TYPE_LINK: {
        const { payload: { tabId } } = action
        const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatusByTabId, tabId)

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield call(openContentScriptFromChromeModule, tabId)
        }

        return
      }


      case fromChromeWebNavigationOnCommittedChannelProcessAction.TRANSITION_AUTO_BOOKMARK: {
        const { payload: { tabId } } = action
        const appStatus: fromAppStatusDomain.AppStatus = yield select(fromBackgroundReducer.getAppStatusByTabId, tabId)

        if(fromAppStatusDomain.isRunning(appStatus)) {
          yield put(fromLoadContentScriptBackgroundProcessAction.stopApp(tabId))
        }

        return
      }

    }

  }
}
