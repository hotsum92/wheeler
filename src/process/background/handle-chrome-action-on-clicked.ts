import { take, put, call } from 'redux-saga/effects'
import * as fromChromeActionOnClickedChannelProcess from '~/process/channel/chrome-action-on-clicked'
import { Action } from '~/action'

export function* watchHandleChromeActionOnClicked() {
  const chan: fromChromeActionOnClickedChannelProcess.Channel =
    yield call(fromChromeActionOnClickedChannelProcess.createChannel())

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}
