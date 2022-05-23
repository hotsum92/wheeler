import { eventChannel, EventChannel } from 'redux-saga'
import { take, put, call } from 'redux-saga/effects'
import * as fromChromeModule from '~/module/chrome'
import { Action } from '~/action'
import * as fromHandleChromeWebNavigationOnCommittedChromeAction from '~/action/chrome/handle-chrome-web-navigation-on-committed'

export function* watchHandleChromeWebNavigationOnCommitted() {
  const chan: EventChannel<Action> = yield call(handleChromeWebNavigationOnCommitted)

  while(true) {
    let action: Action = yield take(chan)
    yield put(action)
  }
}

export const handleChromeWebNavigationOnCommitted = () => {
  return eventChannel(emitter => {
    const listener = (details: { tabId: number, transitionType?: string }) => {
      if(details.transitionType === fromChromeModule.TRANSITION_TYPE_LINK) {
        emitter(fromHandleChromeWebNavigationOnCommittedChromeAction.transitionTypeLink(details.tabId))
      }

      if(details.transitionType === fromChromeModule.TRANSITION_TYPE_RELOAD) {
        emitter(fromHandleChromeWebNavigationOnCommittedChromeAction.transitionTypeReload(details.tabId))
      }
    }

    fromChromeModule.chromeWebNavigationOnCommittedAddListener(listener)

    return () => {
      fromChromeModule.chromeWebNavigationOnCommittedRemoveListener(listener)
    }
  })
}

