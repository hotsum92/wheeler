import { call, put, takeEvery } from 'redux-saga/effects'
import * as fromUrlDomain from '~/domain/url'
import * as fromGetStorageReducerFunctionProcess from '~/process/function/get-storage-reducer'
import * as fromDetectUrlSelectRangeBackgroundProcessAction from '~/action/process/background/detect-url-select-range-update'
import * as fromHandleChromeRuntimeOnMessageChannelProcessAction from '~/action/process/background/handle-chrome-runtime-on-message-channel'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromBackgroundReducer from '~/reducer/background'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromChromeModule from '~/module/chrome'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
  fromHandleChromeRuntimeOnMessageChannelProcessAction.ON_LOAD_CONTENT_UI,
]

export type Action =
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading
  | fromHandleChromeRuntimeOnMessageChannelProcessAction.OnLoadContentUi

export function* watchDetectUrlSelectRangeUpdate(
  saga: ReturnType<typeof createDetectUrlSelectRangeUpdate>,
) {
  yield takeEvery(
    actions,
    saga,
  )
}

export const createDetectUrlSelectRangeUpdate = (
  getTabUrl: typeof fromChromeModule.getTabUrl,
  chromeStorageLocalGet: typeof fromChromeModule.chromeStorageLocalGet,
) => {
  return function* (
    action: Action,
  ) {
    const { payload: { tabId } } = action
    const urlStr: string = yield call(getTabUrl, tabId)
    const url = fromUrlDomain.fromString(urlStr)

    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange =
      yield call(fromGetStorageReducerFunctionProcess.createGetStorageReducer(chromeStorageLocalGet), fromBackgroundReducer.getUrlSelectRangeByUrl, url)

    yield put(fromDetectUrlSelectRangeBackgroundProcessAction.detectedUrlSelectRangeUpdate(tabId, urlSelectRange))
  }
}

