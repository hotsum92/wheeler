import { take, put, call } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromChromeWebNavigationOnCommittedChannelProcess from '~/process/channel/chrome-web-navigation-on-committed'

export function* watchHandleChromeWebNavigationOnCommitted() {
  const chan: fromChromeWebNavigationOnCommittedChannelProcess.Channel =
    yield call(fromChromeWebNavigationOnCommittedChannelProcess.createChannel())

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}

