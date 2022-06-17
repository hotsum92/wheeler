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
      yield call(sendResponse)
      yield call(saga, action, tabId)
      continue
    }

  }
}

export const createHandleChromeRuntimeOnMessage = (
) => {
  return function* (
    action: Action,
    tabId: number
  ) {
    if(action.type === fromContentUiAction.ON_LOAD_CONTENT_UI) {
      yield put(fromHandleChromeRuntimeOnMessageChannelProcessAction.onLoadContentUi(tabId))
      return
    }

    if(action.type === fromContentUiAction.ON_SELECT_URL_INPUT) {
      const { payload: { selectStart, select } } = action
      yield put(fromHandleChromeRuntimeOnMessageChannelProcessAction.onSelectUrlInput(tabId, selectStart, select))
      return
    }

    yield put(action)
  }
}
