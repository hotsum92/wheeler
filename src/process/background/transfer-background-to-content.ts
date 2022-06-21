import { takeEvery, call } from 'redux-saga/effects'
import * as fromGetStorageReducerFunctionProcess from '~/process/function/get-storage-reducer'
import * as fromChromeModule from '~/module/chrome'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromDetectUrlSelectRangeBackgroundProcessAction from '~/action/process/background/detect-url-select-range-update'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromAppStatusDomain from '~/domain/app-status'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
  fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION,
  fromDetectUrlSelectRangeBackgroundProcessAction.DETECTED_URL_SELECT_RANGE_UPDATE,
]

type Action =
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention
  | fromDetectUrlSelectRangeBackgroundProcessAction.DetectedUrlSelectRangeUpdate

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
  chromeStorageLocalGet: typeof fromChromeModule.chromeStorageLocalGet,
) => {
  return function* (action: Action) {

    const { payload: { tabId } } = action

    const appStatus: fromAppStatusDomain.AppStatus =
      yield call(fromGetStorageReducerFunctionProcess.createGetStorageReducer(chromeStorageLocalGet), fromBackgroundReducer.getAppStatusByTabId, tabId)

    if(fromAppStatusDomain.isStop(appStatus)) return

    if(actions.includes(action.type)) {
      try {
        yield call(chromeTabsSendMessage, action.payload.tabId, action)
      } catch {
        // content scriptが起動しているか判断する方法がないので、リロード時はレスポンスがないので、エラーを潰す
      }
    }

  }
}
