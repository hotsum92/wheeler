import { takeLatest, call, select, put } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromContentStatusDomain from '~/domain/content-status'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromContentUiReducer from '~/reducer/content'
import * as fromHideExtentionContentProcessAction from '~/action/process/content/hide-extention'

export const actions = [
  fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION,
]

export function* watchHideExtention(
  saga: ReturnType<typeof createHideExtention>,
) {
  yield takeLatest(
    actions,
    saga,
  )
}

export const createHideExtention = (
  hideDivElement: typeof fromDomModule.hideDivElement
) => {
  return function* (
    _action: fromChromeActionOnClickedChannelProcessAction.OnClickExtention,
  ) {
    const contentStatus: fromContentStatusDomain.ContentStatus
      = yield select(fromContentUiReducer.getContentUiContentStatus)

    if(fromContentStatusDomain.isDisplay(contentStatus)) {
      yield call(hideDivElement)
      yield put(fromHideExtentionContentProcessAction.hidDivElement())
    }
  }
}

