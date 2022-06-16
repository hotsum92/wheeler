import { call, take, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromChromeRuntimeOnMessageChannelProcess from '~/process/channel/chrome-runtime-on-message'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromDetectUrlSelectRangeBackgroundProcessAction from '~/action/process/background/detect-url-select-range-update'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
  fromDetectUrlSelectRangeBackgroundProcessAction.DETECTED_URL_SELECT_RANGE_UPDATE,
  fromChromeActionOnClickedChannelProcessAction.ON_CLICK_EXTENTION,
]

export function* watchHandleChromeRuntimeOnMessage(
  saga: ReturnType<typeof createHandleChromeRuntimeOnMessage>,
) {
  const chan: fromChromeRuntimeOnMessageChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse }: fromChromeRuntimeOnMessageChannelProcess.Message = yield take(chan)
    if(actions.includes(action.type)) {
      yield call(saga, action)
      yield call(sendResponse)
    }
  }
}

export const createHandleChromeRuntimeOnMessage = (
) => {
  return function* (
    action: Action
  ) {
    yield put(action)
  }
}
