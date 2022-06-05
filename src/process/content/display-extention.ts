import { takeLatest, call, select, put } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromContentStatusDomain from '~/domain/content-status'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromContentUiReducer from '~/reducer/content'

export const actions = [
  fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION,
]

export function* watchDisplayExtention(
  saga: ReturnType<typeof createDisplayExtention>,
) {
  yield takeLatest(
    actions,
    saga,
  )
}

export const createDisplayExtention = (
  displayDivElement: typeof fromDomModule.displayDivElement,
) => {
  return function* (
    _action: fromChromeActionOnClickedChannelProcessAction.OnClickExtention,
  ) {
    const contentStatus: fromContentStatusDomain.ContentStatus
      = yield select(fromContentUiReducer.getContentUiContentStatus)

    if(fromContentStatusDomain.isHidden(contentStatus)) {
      yield call(displayDivElement)
      yield put(fromDisplayExtentionContentProcessAction.displayedDivElement())
    }
  }
}

