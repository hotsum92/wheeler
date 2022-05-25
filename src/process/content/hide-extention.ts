import { call, take } from 'redux-saga/effects'
import * as fromDomModule from '~/module/dom'
import * as fromChromeRuntimeOnMessageChannelProcess from '~/process/channel/chrome-runtime-on-message'
import * as fromHideExtentionBackgroundProcessAction from '~/action/process/content/hide-extention'

export const actions = [
  fromHideExtentionBackgroundProcessAction.REQUEST_HIDE_EXTENTION,
]

export function* watchHideExtention(
  saga: ReturnType<typeof createHideExtention>,
) {
  const chan: fromChromeRuntimeOnMessageChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse }: fromChromeRuntimeOnMessageChannelProcess.Message = yield take(chan)
    if(action.type === fromHideExtentionBackgroundProcessAction.REQUEST_HIDE_EXTENTION) {
      yield call(saga, action, sendResponse)
    }
  }
}

export const createHideExtention = (
  hideDivElement: typeof fromDomModule.hideDivElement
) => {
  return function* (
    _action: fromHideExtentionBackgroundProcessAction.RequestHideExtention,
    sendResponse: () => void,
  ) {
    yield call(hideDivElement)
    sendResponse()
  }
}

