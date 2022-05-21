import { eventChannel, EventChannel } from 'redux-saga'
import { Action } from '~/action'
import * as fromChromeModule from '~/module/chrome'

export interface Response {
 action: Action
 sendResponse: (response?: any) => void
}

export type Channel = EventChannel<Response>

export const createChannel = () => {
  return () => {
    return eventChannel<Response>(emitter => {
      const listener = (action: Action, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        emitter({ action, sendResponse })
      }

      fromChromeModule.chromeRuntimeOnMessageAddListener(listener)

      return () => {
        fromChromeModule.chromeRuntimeOnMessageRemoveListener(listener)
      }
    })
  }
}
