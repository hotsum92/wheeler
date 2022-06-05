import { call, take, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromChromeRuntimeOnMessageChannelProcess from '~/process/channel/chrome-runtime-on-message'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'

export const actions = [
  fromChromeTabsOnUpdatedProcessAction.TAB_STATUS_LOADING,
  fromDisplayExtentionContentProcessAction.REQUEST_DISPLAY_EXTENTION,
]

export function* watchHandleChromeRuntimeOnMessage(
  saga: ReturnType<typeof createHandleChromeRuntimeOnMessage>,
) {
  const chan: fromChromeRuntimeOnMessageChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse }: fromChromeRuntimeOnMessageChannelProcess.Message = yield take(chan)
    if(actions.includes(action.type)) {
      yield call(saga, action)
    }
    yield call(sendResponse)
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
