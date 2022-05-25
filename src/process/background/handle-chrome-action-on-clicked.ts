import { take, put, call } from 'redux-saga/effects'
import * as fromHandleChromeActionOnClickedChannelProcess from '~/process/channel/handle-chrome-action-on-clicked'
import { Action } from '~/action'

export function* watchHandleChromeActionOnClicked() {
  const chan: fromHandleChromeActionOnClickedChannelProcess.Channel =
    yield call(fromHandleChromeActionOnClickedChannelProcess.createChannel())

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}
