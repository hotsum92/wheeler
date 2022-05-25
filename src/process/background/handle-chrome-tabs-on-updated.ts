import { take, put, call } from 'redux-saga/effects'
import { Action } from '~/action'
import * as fromChromeTabsOnUpdatedChannelProcess from '~/process/channel/chrome-tabs-on-updated'

export function* watchHandleChromeTabsOnUpdated() {
  const chan: fromChromeTabsOnUpdatedChannelProcess.Channel = yield call(fromChromeTabsOnUpdatedChannelProcess.createChannel())

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}

