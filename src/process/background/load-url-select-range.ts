import { call, take, select } from 'redux-saga/effects'
import * as fromChromeRuntimeOnMessageChannelProcess from '~/process/channel/chrome-runtime-on-message'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromUrlSelectRangeDomain from '~/domain/url-select-range'
import * as fromBackgroundReducer from '~/reducer/background'

export const actions = [
  fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE,
]

export function* watchLoadUrlSelectRange(
  saga: ReturnType<typeof createLoadUrlSelectRange>,
) {
  const chan: fromChromeRuntimeOnMessageChannelProcess.Channel = yield call(fromChromeRuntimeOnMessageChannelProcess.createChannel())

  while(true) {
    const { action, sendResponse }: fromChromeRuntimeOnMessageChannelProcess.Message = yield take(chan)
    if(action.type === fromLoadUrlSelectRangeBackgroundProcessAction.REQUEST_LOAD_URL_SELECT_RANGE) {
      yield call(saga, action, sendResponse)
    }
  }
}

export const createLoadUrlSelectRange = (
) => {
  return function* (
    action: fromLoadUrlSelectRangeBackgroundProcessAction.RequestLoadUrlSelectRange,
    sendResponse: (response: fromUrlSelectRangeDomain.UrlSelectRange) => void,
  ) {
    const urlSelectRange: fromUrlSelectRangeDomain.UrlSelectRange = yield select(fromBackgroundReducer.getUrlSelectRangeByUrl, action.payload.url)
    sendResponse(urlSelectRange)
  }
}

