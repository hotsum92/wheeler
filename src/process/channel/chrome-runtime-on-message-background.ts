import { eventChannel, EventChannel } from 'redux-saga'
import { Action } from '~/action'
import * as fromChromeModule from '~/module/chrome'

export interface Message {
 action: Action
 sendResponse: (response?: any) => void
 tabId: number
}

export type Channel = EventChannel<Message>

export const createChannel = () => {
  return () => {
    return eventChannel<Message>(emitter => {
      const listener = (action: Action, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        emitter({ action, sendResponse, tabId: sender.tab!.id! })
      }

      fromChromeModule.chromeRuntimeOnMessageAddListener(listener)

      return () => {
        fromChromeModule.chromeRuntimeOnMessageRemoveListener(listener)
      }
    })
  }
}
