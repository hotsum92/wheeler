import { eventChannel, EventChannel } from 'redux-saga'
import { take, put, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import { Action } from '~/action'
import * as fromChromeAction from '~/action/chrome'

export function* watchHandleChromeTabsOnUpdated() {
  const chan: EventChannel<Action> = yield call(handleChromeTabsOnUpdated)

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}

export const handleChromeTabsOnUpdated = () => {
  return eventChannel(emitter => {
    const listener = (tabId: number, changeInfo: { status?: string }) => {
      if(changeInfo.status === fromChromeModule.STATUS_LOADING) {
        emitter(fromChromeAction.onUpdateWebPage(tabId))
      }
    }

    fromChromeModule.chromeTabsOnUpdatedAddListener(listener)

    return () => {
      fromChromeModule.chromeTabsOnUpdatedRemoveListener(listener)
    }
  })
}

