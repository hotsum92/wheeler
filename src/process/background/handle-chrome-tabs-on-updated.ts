import { eventChannel, EventChannel } from 'redux-saga'
import { take, put, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import { Action } from '~/action'
import * as fromHandleChromeTabsOnUpdated from '~/action/chrome/handle-chrome-tabs-on-updated'

export function* watchHandleChromeTabsOnUpdated() {
  const chan: EventChannel<Action> = yield call(handleChromeTabsOnUpdated)

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}

export const handleChromeTabsOnUpdated = () => {
  return eventChannel(emitter => {
    const listener = (tabId: number, changeInfo: any) => {
      if(changeInfo.status === fromChromeModule.TAB_STATUS_LOADING) {
        emitter(fromHandleChromeTabsOnUpdated.tabStatusLoading(tabId))
      }

      if(changeInfo.status === fromChromeModule.TAB_STATUS_COMPLETE) {
        emitter(fromHandleChromeTabsOnUpdated.tabStatusComplete(tabId))
      }
    }

    fromChromeModule.chromeTabsOnUpdatedAddListener(listener)

    return () => {
      fromChromeModule.chromeTabsOnUpdatedRemoveListener(listener)
    }
  })
}

