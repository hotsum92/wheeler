import { call, select, put, takeEvery } from 'redux-saga/effects'
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
) => {
  return function* (
    action: Action,
  ) {
    const { payload: { tabId } } = action
    const url: string = yield call(getTabUrl, tabId)
    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange = yield select(fromBackgroundReducer.getUrlSelectRangeByUrl, url)
    yield put(fromDetectUrlSelectRangeBackgroundProcessAction.detectedUrlSelectRangeUpdate(tabId, urlSelectRange))
  }
}

