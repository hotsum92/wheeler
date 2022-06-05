import { takeEvery, call, select } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
  fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION,
]

type Action =
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention

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

    if(fromAppStatusDomain.isStop(appStatus)) return

    if(actions.includes(action.type)) {
      try {
        // content scriptが起動しているか判断する方法がないので、リロード時はレスポンスがないので、エラーを潰す
        yield call(chromeTabsSendMessage, action.payload.tabId, action)
      } catch {
      }
    }

  }
}
