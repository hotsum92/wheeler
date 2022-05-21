import { eventChannel, EventChannel } from 'redux-saga'
import { take, put, call } from 'redux-saga/effects'
import { chromeActionOnClickedAddListener, chromeActionOnClickedRemoveListener } from '~/module/chrome'
import { Action } from '~/action'
import * as fromChromeAction from '~/action/chrome'

export function* watchHandleChromeActionOnClicked() {
  const chan: EventChannel<Action> = yield call(handleChromeActionOnClicked)

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}

export const handleChromeActionOnClicked = () => {
  return eventChannel(emitter => {
    const listener = (tab: { id?: number }) => {
      if(tab.id != null) {
        emitter(fromChromeAction.onClickExtention(tab.id))
      }
    }

    chromeActionOnClickedAddListener(listener)

    return () => {
      chromeActionOnClickedRemoveListener(listener)
    }
  })
}

