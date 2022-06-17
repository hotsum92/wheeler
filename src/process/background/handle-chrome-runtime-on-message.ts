import { call, take, put } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromContentUiAction from '~/action/ui/content'
import * as fromHandleChromeRuntimeOnMessageChannelProcessAction from '~/action/process/background/handle-chrome-runtime-on-message-channel'
import * as fromChromeRuntimeOnMessageBackgroundChannelProcess from '~/process/channel/chrome-runtime-on-message-background'

export const actions = [
  fromContentUiAction.ON_LOAD_CONTENT_UI,
  fromContentUiAction.ON_SELECT_URL_INPUT,
]

export function* watchHandleChromeRuntimeOnMessage(
  saga: ReturnType<typeof createHandleChromeRuntimeOnMessage>,
) {
  const chan: fromChromeRuntimeOnMessageBackgroundChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageBackgroundChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse, tabId }: fromChromeRuntimeOnMessageBackgroundChannelProcess.Message = yield take(chan)
    if(actions.includes(action.type)) {
      if(action.type === fromContentUiAction.ON_LOAD_CONTENT_UI) {
        yield call(sendResponse)
        yield call(saga, fromHandleChromeRuntimeOnMessageChannelProcessAction.onLoadContentUi(tabId))
      }
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
