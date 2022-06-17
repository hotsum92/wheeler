import { eventChannel, EventChannel } from 'redux-saga'
import { Action } from '~/action'
import * as fromChromeModule from '~/module/chrome'

export interface Message {
 action: Action
 sendResponse: (response?: any) => void
}

export type Channel = EventChannel<Message>

// TODO: ファイル名変更
export const createChannel = () => {
  return () => {
    return eventChannel<Message>(emitter => {
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
