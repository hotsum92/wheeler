import { call, take } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromChromeRuntimeOnMessageChannelProcess from '~/process/channel/chrome-runtime-on-message'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'

export const actions = [
  fromDisplayExtentionContentProcessAction.REQUEST_DISPLAY_EXTENTION,
]

export function* watchDisplayExtention(
  saga: ReturnType<typeof createDisplayExtention>,
) {
  const chan: fromChromeRuntimeOnMessageChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse }: fromChromeRuntimeOnMessageChannelProcess.Message = yield take(chan)
    if(action.type === fromDisplayExtentionContentProcessAction.REQUEST_DISPLAY_EXTENTION) {
      yield call(saga, action, sendResponse)
    }
  }
}

export const createDisplayExtention = (
  displayDivElement: typeof fromDomModule.displayDivElement,
) => {
  return function* (
    _action: fromDisplayExtentionContentProcessAction.RequestDisplayExtention,
    sendResponse: () => void,
  ) {
    yield call(displayDivElement)
    sendResponse()
  }
}

