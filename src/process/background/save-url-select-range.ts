import { call, take, put } from 'redux-saga/effects'
import * as fromSaveSelectRangeBackgroundProcess from '~/action/process/background/save-url-select-range'
import * as fromChromeRuntimeOnMessageChannelProcess from '~/process/channel/chrome-runtime-on-message'

export const actions = [
  fromSaveSelectRangeBackgroundProcess.REQUEST_SAVE_URL_SELECT_RANGE,
]

export function* watchSaveUrlSelectRange(
  saga: ReturnType<typeof createSaveUrlSelectRange>,
) {
  const chan: fromChromeRuntimeOnMessageChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse }: fromChromeRuntimeOnMessageChannelProcess.Message = yield take(chan)
    if(action.type === fromSaveSelectRangeBackgroundProcess.REQUEST_SAVE_URL_SELECT_RANGE) {
      yield call(saga, action, sendResponse)
    }
  }
}

export const createSaveUrlSelectRange = (
) => {
  return function* (
    action: fromSaveSelectRangeBackgroundProcess.RequestSaveUrlSelectRange,
    sendResponse: (response?: any) => void,
  ) {
    const { payload: { url, selectStart } } = action
    sendResponse()
    yield put(fromSaveSelectRangeBackgroundProcess.saveUrlSelectRange(url, selectStart))
  }
}

